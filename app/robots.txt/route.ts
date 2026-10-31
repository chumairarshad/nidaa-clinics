import '../next-blogpanel.setup';
import { GET as getBlogRobots } from 'next-blogpanel/api/robots-txt';

export async function GET() {
  const response = await getBlogRobots();
  const text = await response.text();
  const sitemapLine = '\nSitemap: https://nidaclinic.com/sitemap.xml\n';
  const finalText = text.includes('Sitemap:') ? text : text.trimEnd() + sitemapLine;
  return new Response(finalText, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
