export const dynamic = 'force-static';

export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://www.nidaclinic.com/sitemap.xml
`;
  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
