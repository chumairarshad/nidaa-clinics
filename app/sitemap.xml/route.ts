import fs from 'fs';
import path from 'path';
import { fetchPublishedPosts, fetchCategories } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nidaclinic.com').replace(/\/+$/, '');
  const root = process.cwd();

  // 1. Static Clinic Pages
  const staticPages = [
    { path: '', file: 'index.html', priority: '1.0', changefreq: 'daily' },
    { path: '/what-we-do.html', file: 'what-we-do.html', priority: '0.8', changefreq: 'weekly' },
    { path: '/our-team.html', file: 'our-team.html', priority: '0.8', changefreq: 'weekly' },
    { path: '/awards-certificates.html', file: 'awards-certificates.html', priority: '0.7', changefreq: 'monthly' },
    { path: '/podcast-video.html', file: 'podcast-video.html', priority: '0.7', changefreq: 'monthly' },
    { path: '/reviews.html', file: 'reviews.html', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact-us.html', file: 'contact-us.html', priority: '0.8', changefreq: 'monthly' },
  ];

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

  for (const page of staticPages) {
    let lastmod = new Date().toISOString();
    try {
      const filePath = path.join(root, page.file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        lastmod = stats.mtime.toISOString();
      }
    } catch {
      // fallback
    }
    urls.push({
      loc: `${siteUrl}${page.path}`,
      lastmod,
      changefreq: page.changefreq,
      priority: page.priority,
    });
  }

  // 2. Public Blog Root
  urls.push({
    loc: `${siteUrl}/blog`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: '0.9',
  });

  // 3. Dynamic Published Blog Posts from Supabase / Fallback
  try {
    const { posts } = await fetchPublishedPosts({ limit: 10000 });
    for (const post of posts) {
      if (!post.slug || post.status !== 'published') continue;
      const postLastmod = post.updatedAt
        ? new Date(post.updatedAt).toISOString()
        : post.publishedAt
        ? new Date(post.publishedAt).toISOString()
        : new Date().toISOString();

      urls.push({
        loc: `${siteUrl}/blog/${post.slug}`,
        lastmod: postLastmod,
        changefreq: 'weekly',
        priority: '0.8',
      });
    }
  } catch (err) {
    console.warn('[sitemap] Failed to fetch posts for sitemap:', err);
  }

  // 4. Dynamic Categories
  try {
    const categories = await fetchCategories();
    for (const cat of categories) {
      if (!cat.slug) continue;
      urls.push({
        loc: `${siteUrl}/blog?category=${cat.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.6',
      });
    }
  } catch (err) {
    console.warn('[sitemap] Failed to fetch categories for sitemap:', err);
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${escapeXml(u.lastmod)}</lastmod>
    <changefreq>${escapeXml(u.changefreq)}</changefreq>
    <priority>${escapeXml(u.priority)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
