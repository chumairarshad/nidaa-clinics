import { HOMEPAGE_HTML } from './homepage-html';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  return new Response(HOMEPAGE_HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
