import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

/**
 * NiDAA Clinic — Secure On-Demand Cache Revalidation Endpoint
 * Protects against arbitrary path invalidation, timing attacks, and secret leakage.
 */

// Timing-safe constant-time string comparison to prevent timing attacks
function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Strict slug regex: lowercase alphanumeric with single hyphens
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SLUG_LENGTH = 120;

// Whitelist of allowed exact top-level paths for manual revalidation
const ALLOWED_EXACT_PATHS = new Set(['/blog', '/sitemap.xml']);

export async function POST(request: NextRequest) {
  try {
    // 1. Strict Server-Side Secret Verification
    const configuredSecret = process.env.REVALIDATION_SECRET;
    if (!configuredSecret || configuredSecret.trim().length < 16) {
      console.error('[revalidate] REVALIDATION_SECRET is not configured or too short.');
      return NextResponse.json(
        { error: 'Server misconfiguration: REVALIDATION_SECRET is not set' },
        { status: 500 }
      );
    }

    // Require secret in x-revalidation-secret header (or Bearer token)
    const authHeader = request.headers.get('x-revalidation-secret');
    const bearerHeader = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    const providedSecret = (authHeader || bearerHeader || '').trim();

    if (!providedSecret || !timingSafeEqual(providedSecret, configuredSecret.trim())) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing revalidation secret' },
        { status: 401 }
      );
    }

    // 2. Validate Request Body
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Bad Request: JSON body required' },
        { status: 400 }
      );
    }

    const { slug, path } = body;

    // Reject requests with neither slug nor path
    if (!slug && !path) {
      return NextResponse.json(
        { error: 'Bad Request: Either "slug" or "path" must be provided' },
        { status: 400 }
      );
    }

    let revalidatedTarget = '';

    // 3. Strict Slug Validation & Invalidation
    if (slug) {
      if (
        typeof slug !== 'string' ||
        slug.length > MAX_SLUG_LENGTH ||
        !SLUG_REGEX.test(slug.trim())
      ) {
        return NextResponse.json(
          { error: 'Bad Request: Invalid article slug format' },
          { status: 400 }
        );
      }

      const cleanSlug = slug.trim().toLowerCase();
      revalidatePath(`/blog/${cleanSlug}`);
      revalidatePath('/blog');
      revalidatePath('/sitemap.xml');
      revalidatedTarget = `/blog/${cleanSlug}`;
    }

    // 4. Strict Path Validation & Invalidation
    if (path) {
      if (typeof path !== 'string') {
        return NextResponse.json(
          { error: 'Bad Request: "path" must be a string' },
          { status: 400 }
        );
      }

      const cleanPath = path.trim();

      if (ALLOWED_EXACT_PATHS.has(cleanPath)) {
        revalidatePath(cleanPath);
        revalidatedTarget = revalidatedTarget || cleanPath;
      } else if (cleanPath.startsWith('/blog/')) {
        const pathSlug = cleanPath.slice('/blog/'.length);
        if (
          !pathSlug ||
          pathSlug.length > MAX_SLUG_LENGTH ||
          !SLUG_REGEX.test(pathSlug)
        ) {
          return NextResponse.json(
            { error: 'Bad Request: Invalid slug in article path' },
            { status: 400 }
          );
        }
        revalidatePath(cleanPath);
        revalidatePath('/blog');
        revalidatePath('/sitemap.xml');
        revalidatedTarget = revalidatedTarget || cleanPath;
      } else {
        return NextResponse.json(
          {
            error: 'Forbidden: Arbitrary path invalidation is not permitted. Only blog routes may be revalidated.',
          },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({
      revalidated: true,
      target: revalidatedTarget,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[revalidate] Revalidation exception:', error);
    return NextResponse.json(
      { error: error?.message || 'Revalidation failed' },
      { status: 500 }
    );
  }
}

// Block GET requests — cache invalidation must be an intentional POST mutation
export async function GET() {
  return NextResponse.json(
    { error: 'Method Not Allowed: Cache revalidation must be requested via POST' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}
