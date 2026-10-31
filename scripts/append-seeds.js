const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '..', '.data', 'cms-store.json');
const data = JSON.parse(fs.readFileSync(storePath, 'utf8'));

const homepageSlugs = [
  'understanding-ice-crystal-meth-addiction-medical-detox',
  'cbt-exposure-therapy-panic-attacks-ocd',
  'early-warning-signs-psychosis-major-depressive-disorder',
  'breaking-codependency-families-heal-addiction-recovery',
];

let sqlAppend = '\n-- ----------------------------------------------------------------------------\n-- 7. HOMEPAGE ARTICLES SEED\n-- ----------------------------------------------------------------------------\n';

homepageSlugs.forEach((slug) => {
  const p = data.posts.find((item) => item.slug === slug);
  if (!p) return;
  const esc = (str) => (str || '').replace(/'/g, "''");
  const tagsSql = 'ARRAY[' + p.tags.map((t) => "'" + esc(t) + "'").join(', ') + ']';

  sqlAppend += `
INSERT INTO public.blog_posts (
    title, slug, excerpt, content, featured_image_url, category_slug, category_name,
    tags, status, seo_title, seo_description, author_name, author_role, reading_time, published_at
) VALUES (
    '${esc(p.title)}',
    '${p.slug}',
    '${esc(p.excerpt)}',
    '${esc(p.contentHTML)}',
    '${p.coverImage.url}',
    '${p.categories[0]}',
    '${esc(p.categories[0].replace(/-/g, ' '))}',
    ${tagsSql},
    'published',
    '${esc(p.seo.metaTitle)}',
    '${esc(p.seo.metaDescription)}',
    '${esc(p.author.name)}',
    '${esc(p.author.bio)}',
    ${p.readingTime},
    NOW()
) ON CONFLICT (slug) DO NOTHING;
`;
});

const m1 = path.join(__dirname, '..', 'supabase', 'migrations', '001_create_blog_schema.sql');
const m2 = path.join(__dirname, '..', 'nidaa-blog-admin', 'supabase', 'migrations', '001_create_blog_schema.sql');

if (!fs.readFileSync(m1, 'utf8').includes('understanding-ice-crystal-meth-addiction-medical-detox')) {
  fs.appendFileSync(m1, sqlAppend);
  console.log('Appended to', m1);
}
if (!fs.readFileSync(m2, 'utf8').includes('understanding-ice-crystal-meth-addiction-medical-detox')) {
  fs.appendFileSync(m2, sqlAppend);
  console.log('Appended to', m2);
}
