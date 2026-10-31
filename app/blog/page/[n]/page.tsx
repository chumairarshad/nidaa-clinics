import '../../../next-blogpanel.setup';
import { BlogCard, BlogSearch, Pagination, CategoryList } from 'next-blogpanel/components';
import { listPosts, listCategories, getSettings, coerceListingVariant } from 'next-blogpanel/lib';
import { notFound, redirect } from 'next/navigation';

// Regenerate at most every 5 minutes; the admin API revalidates affected
// pages instantly on every change, so this is only a safety net for edits
// made directly in the database. Tune freely — this file is yours.
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { total } = await listPosts({ page: 1, limit: 1, status: 'published' });
    const pages = Math.max(1, Math.ceil(total / 10));
    return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ n: String(i + 2) }));
  } catch {
    return [];
  }
}

export default async function BlogPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const page = parseInt(n, 10);
  if (!Number.isInteger(page) || page < 2) redirect('/blog');
  if (String(page) !== n) redirect(`/blog/page/${page}`);

  let posts: any[] = [];
  let total = 0;
  let categories: any[] = [];
  let settings: any = {};

  try {
    const [postsRes, catsRes, settingsRes] = await Promise.all([
      listPosts({ page, limit: 10, status: 'published', sortBy: 'publishedAt', sortOrder: 'desc' }),
      listCategories(),
      getSettings(),
    ]);
    posts = postsRes.posts;
    total = postsRes.total;
    categories = catsRes;
    settings = settingsRes;
  } catch (error) {
    console.warn('[blog] Database connection error in pagination page:', error);
  }

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
            pageHref={(p) => (p === 1 ? '/blog' : `/blog/page/${p}`)}
          />
        </div>

        {categories.length > 0 && (
          <aside className="nbp-blog-sidebar">
            <CategoryList
              categories={JSON.parse(JSON.stringify(categories))}
              basePath="/blog"
            />
          </aside>
        )}
      </div>
    </div>
  );
}
