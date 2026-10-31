import '../../../../../next-blogpanel.setup';
import { BlogCard, BlogSearch, Pagination, CategoryList } from 'next-blogpanel/components';
import { listPosts, listCategories, getSettings, coerceListingVariant } from 'next-blogpanel/lib';
import { notFound, redirect } from 'next/navigation';

// Regenerate at most every 5 minutes; the admin API revalidates affected
// pages instantly on every change, so this is only a safety net for edits
// made directly in the database. Tune freely — this file is yours.
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  // Pagination depth per category isn't knowable cheaply at build time;
  // dynamicParams renders these on first request and caches them.
  return [];
}

export default async function CategoryPageN({ params }: { params: Promise<{ slug: string; n: string }> }) {
  const { slug, n } = await params;
  const page = parseInt(n, 10);
  if (!Number.isInteger(page) || page < 2) redirect(`/blog/category/${slug}`);
  // '2abc' and '02' both parse to 2 — see the listing pagination page for why
  // only the round-tripping spelling is allowed to render.
  if (String(page) !== n) redirect(`/blog/category/${slug}/page/${page}`);

  // getSettings() is read at regeneration time, not per view — see the
  // listing page's comment for why.
  const [{ posts, total }, categories, settings] = await Promise.all([
    listPosts({ page, limit: 10, status: 'published', category: slug, sortBy: 'publishedAt', sortOrder: 'desc' }),
    listCategories(),
    getSettings(),
  ]);
  if (posts.length === 0) notFound();

  const totalPages = Math.ceil(total / 10);
  const listingVariant = coerceListingVariant(settings.listingVariant);

  return (
    <div className="nbp-blog-list">
      <div className="nbp-blog-header">
        <BlogSearch apiPath="/api/blog" />
      </div>

      <div className="nbp-blog-layout">
        <div className="nbp-blog-main">
          <div className={`nbp-posts-${listingVariant}`}>
            {posts.map((post, index) => (
              <BlogCard
                key={String(post._id || post.slug)}
                post={JSON.parse(JSON.stringify(post))}
                categories={JSON.parse(JSON.stringify(categories))}
                basePath="/blog"
                layout={listingVariant === 'list' || listingVariant === 'split' ? 'horizontal' : 'vertical'}
                hideImage={
                  listingVariant === 'minimal' ||
                  listingVariant === 'timeline' ||
                  (listingVariant === 'newspaper' && index > 0)
                }
              />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            pageHref={(p) => (p === 1 ? `/blog/category/${slug}` : `/blog/category/${slug}/page/${p}`)}
          />
        </div>

        {categories.length > 0 && (
          <aside className="nbp-blog-sidebar">
            <CategoryList
              categories={JSON.parse(JSON.stringify(categories))}
              activeCategory={slug}
              basePath="/blog"
            />
          </aside>
        )}
      </div>
    </div>
  );
}
