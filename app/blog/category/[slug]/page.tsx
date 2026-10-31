import '../../../next-blogpanel.setup';
import { BlogCard, BlogSearch, Pagination, CategoryList } from 'next-blogpanel/components';
import { listPosts, listCategories, getSettings, coerceListingVariant } from 'next-blogpanel/lib';

// Regenerate at most every 5 minutes; the admin API revalidates affected
// pages instantly on every change, so this is only a safety net for edits
// made directly in the database. Tune freely — this file is yours.
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const categories = await listCategories();
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const page = 1;

  let posts: any[] = [];
  let total = 0;
  let categories: any[] = [];
  let settings: any = {};

  try {
    const [postsRes, catsRes, settingsRes] = await Promise.all([
      listPosts({
        page,
        limit: 10,
        status: 'published',
        category: slug,
        sortBy: 'publishedAt',
        sortOrder: 'desc',
      }),
      listCategories(),
      getSettings(),
    ]);
    posts = postsRes.posts;
    total = postsRes.total;
    categories = catsRes;
    settings = settingsRes;
  } catch (error) {
    console.warn('[blog] Database connection error in category page:', error);
  }

  const totalPages = Math.ceil(total / 10);
  const listingVariant = coerceListingVariant(settings.listingVariant);

  return (
    <div className="nbp-blog-list">
      <div className="nbp-blog-header">
        <BlogSearch apiPath="/api/blog" />
      </div>

      <div className="nbp-blog-layout">
        <div className="nbp-blog-main">
          {posts.length === 0 ? (
            <div className="nbp-empty-state">
              <p>No posts found in this category.</p>
            </div>
          ) : (
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
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              pageHref={(p) => (p === 1 ? `/blog/category/${slug}` : `/blog/category/${slug}/page/${p}`)}
            />
          )}
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
