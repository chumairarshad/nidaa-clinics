import { NextResponse, type NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  try {
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

    return NextResponse.next();
  } catch (_err) {
    // Fail-safe: NEVER throw a 500 or MIDDLEWARE_INVOCATION_FAILED on edge runtime
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, css, js, fonts, pdfs, and other static assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|txt|xml|pdf)$).*)',
  ],
};
