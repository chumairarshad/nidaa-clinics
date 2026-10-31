import { NextResponse, type NextRequest } from 'next/server';

const FETCH_TIMEOUT_MS = 2000;

function createBlogRedirectMiddleware(opts: { apiPath: string; ttlMs?: number }) {
  const ttl = opts.ttlMs ?? 60000;
  let cache: { map: Map<string, any>; etag: string | null; fetchedAt: number } | null = null;
  let inFlight: Promise<void> | null = null;

  async function fetchManifest(origin: string) {
    const now = Date.now();
    try {
      const headers: Record<string, string> = {};
      if (cache?.etag) headers['If-None-Match'] = cache.etag;
      const res = await fetch(`${origin}${opts.apiPath}/redirects`, {
        headers,
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (res.status === 304 && cache) {
        cache.fetchedAt = now;
        return;
      }
      if (!res.ok) {
        if (cache) cache.fetchedAt = now;
        else cache = { map: new Map(), etag: null, fetchedAt: now };
        return;
      }
      const body = await res.json();
      cache = {
        map: new Map(body.redirects.map((r: any) => [r.from, r])),
        etag: res.headers.get('ETag'),
        fetchedAt: now,
      };
    } catch {
      if (cache) cache.fetchedAt = now;
      else cache = { map: new Map(), etag: null, fetchedAt: now };
    }
  }

  async function refresh(origin: string) {
    if (cache && Date.now() - cache.fetchedAt < ttl) return;
    if (inFlight) return inFlight;
    inFlight = fetchManifest(origin).finally(() => {
      inFlight = null;
    });
    return inFlight;
  }

  return async function blogRedirectMiddleware(request: NextRequest) {
    const path = request.nextUrl.pathname.replace(/\/+$/, '') || '/';
    if (path === opts.apiPath || path.startsWith(opts.apiPath + '/')) return undefined;
    await refresh(request.nextUrl.origin);
    const hit = cache?.map.get(path);
    if (!hit) return undefined;
    const target = /^https?:\/\//i.test(hit.to) ? hit.to : new URL(hit.to, request.url).toString();
    return NextResponse.redirect(target, hit.statusCode === 302 ? 302 : 301);
  };
}

const redirects = createBlogRedirectMiddleware({ apiPath: '/api/blog' });

export default async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // 1. Check if accessed via dedicated admin subdomain (e.g. blog-admin.* or admin.*)
  const isAdminSubdomain =
    host.startsWith('blog-admin.') ||
    host.startsWith('admin.') ||
    host.includes('blog-admin') ||
    host.startsWith('admin-blog.');

  if (isAdminSubdomain) {
    // If public blog is requested on admin subdomain, redirect to main site canonical URL
    if (pathname === '/blog' || pathname.startsWith('/blog/')) {
      const mainDomain = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nidaclinic.com').replace(/\/+$/, '');
      return NextResponse.redirect(`${mainDomain}${pathname}`, 301);
    }

    // Direct root access on admin subdomain rewrites to the admin dashboard
    if (pathname === '/' || pathname === '') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/blog';
      const response = NextResponse.rewrite(url);
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return response;
    }

    // Direct sub-routes (e.g. /posts, /new, /media, /categories, /settings) rewrite to /admin/blog/*
    const adminShortcuts = [
      '/posts',
      '/new',
      '/media',
      '/categories',
      '/settings',
      '/users',
      '/profile',
      '/redirects',
      '/audit',
    ];
    for (const shortcut of adminShortcuts) {
      if (pathname === shortcut || pathname.startsWith(shortcut + '/')) {
        const url = request.nextUrl.clone();
        url.pathname = `/admin/blog${pathname}`;
        const response = NextResponse.rewrite(url);
        response.headers.set('X-Robots-Tag', 'noindex, nofollow');
        return response;
      }
    }

    // Ensure all admin subdomain pages have noindex header
    if (pathname.startsWith('/admin')) {
      const response = NextResponse.next();
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return response;
    }
  }

  // 2. Prevent search indexing on admin routes and ensure /admin redirects to /admin/blog
  if (pathname === '/admin' || pathname === '/admin/') {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/blog';
    const response = NextResponse.redirect(url, 307);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  if (pathname.startsWith('/admin')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // 3. Blog 301/302 Redirect handling (slug changes & custom redirects)
  const redirectResponse = await redirects(request);
  if (redirectResponse) return redirectResponse;

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|txt|xml)$).*)'],
};
