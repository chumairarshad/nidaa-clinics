import React from 'react';
import { fetchPublishedPosts, fetchCategories } from '@/lib/supabase';
import type { Metadata } from 'next';

export const revalidate = 60; // Refresh every 60 seconds (ISR) or via on-demand revalidation

export const metadata: Metadata = {
  title: 'Psychiatric Care & Rehabilitation Journal | NiDAA Clinic Lahore',
  description:
    'Clinical insights, psychiatric research, addiction recovery guidelines, and mental health resources from Dr. Bilal Warraich at NiDAA Clinic Lahore.',
  alternates: {
    canonical: 'https://nidaclinic.com/blog',
  },
  openGraph: {
    title: 'NiDAA Clinic Medical Journal | Psychiatric Care & Rehab Lahore',
    description:
      'Clinical insights, psychiatric research, and mental health resources from Dr. Bilal Warraich.',
    url: 'https://nidaclinic.com/blog',
    siteName: 'NiDAA Clinic Lahore',
    type: 'website',
  },
};

interface BlogSearchParams {
  category?: string;
  q?: string;
  page?: string;
}

interface BlogPageProps {
  searchParams?: BlogSearchParams | Promise<BlogSearchParams>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params: BlogSearchParams = (await Promise.resolve(searchParams)) || {};
  const selectedCategory = params.category || 'all';
  const searchQuery = params.q || '';
  const page = parseInt(params.page || '1', 10);

  // Fetch only published articles from Supabase (with automatic fallback to local store)
  const [{ posts, total, totalPages }, categories] = await Promise.all([
    fetchPublishedPosts({
      category: selectedCategory,
      search: searchQuery,
      page,
      limit: 12, // 4 clean rows of 3 cards on desktop
    }),
    fetchCategories(),
  ]);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem 5rem 1.5rem' }}>
      {/* 1. Breadcrumb navigation */}
      <nav
        aria-label="Breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem',
          color: '#64748B',
          marginBottom: '1.75rem',
        }}
      >
        <a href="/" style={{ color: '#64748B', textDecoration: 'none' }}>
          Home
        </a>
        <span>/</span>
        <span style={{ color: '#BA181E', fontWeight: 600 }}>Medical Journal</span>
        {selectedCategory !== 'all' && (
          <>
            <span>/</span>
            <span style={{ color: '#0F172A', fontWeight: 600, textTransform: 'capitalize' }}>
              {selectedCategory.replace(/-/g, ' ')}
            </span>
          </>
        )}
      </nav>

      {/* 2. Hero Header — Signature Medical Crimson Banner matching reference card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #BA181E 0%, #8E0E14 55%, #63080D 100%)',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          color: '#FFFFFF',
          marginBottom: '3rem',
          boxShadow: '0 20px 45px rgba(186, 24, 30, 0.25)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle ambient light */}
        <div
          style={{
            position: 'absolute',
            top: '-40%',
            right: '-10%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>
          {/* Top Pill Tag */}
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              background: 'rgba(255, 255, 255, 0.16)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              marginBottom: '1.25rem',
            }}
          >
            Evidence-Based Care &amp; Clinical Knowledge
          </div>

          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: '-0.025em',
              marginBottom: '1rem',
              color: '#FFFFFF',
            }}
          >
            NiDAA Clinic: Psychiatric Care, Rehab &amp; Clinical Insights
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.88)',
              margin: '0 0 1.75rem 0',
              fontWeight: 400,
            }}
          >
            Under the direct supervision of Medical Director Dr. Bilal Warraich (UNODC American Qualified),
            NiDAA delivers specialized psychiatric treatment for Drug Abuse, Psychosis, MDD, and OCD,
            alongside practical educational guidance.
          </p>

          {/* Quick Pill Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#FFFFFF',
                background: 'rgba(0, 0, 0, 0.22)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
              }}
            >
              Substance Abuse Detox
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#FFFFFF',
                background: 'rgba(0, 0, 0, 0.22)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
              }}
            >
              Psychosis &amp; MDD
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#FFFFFF',
                background: 'rgba(0, 0, 0, 0.22)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
              }}
            >
              OCD &amp; ERP Protocol
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#FFFFFF',
                background: 'rgba(0, 0, 0, 0.22)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
              }}
            >
              CBT &amp; ACT Training
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#FFFFFF',
                background: 'rgba(0, 0, 0, 0.22)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
              }}
            >
              PHC Reg. #39483
            </span>
          </div>
        </div>
      </div>

      {/* 3. Search Bar & Category Filters */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        {/* Search Input Form */}
        <form
          method="GET"
          action="/blog"
          style={{
            display: 'flex',
            maxWidth: '540px',
            width: '100%',
            gap: '0.5rem',
          }}
        >
          <input
            type="text"
            name="q"
            defaultValue={searchQuery}
            placeholder="Search articles by condition, therapy, or symptom..."
            style={{
              flex: 1,
              padding: '0.75rem 1.15rem',
              border: '1.5px solid #E2E8F0',
              borderRadius: '9999px',
              fontSize: '0.925rem',
              outline: 'none',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          />
          {selectedCategory !== 'all' && (
            <input type="hidden" name="category" value={selectedCategory} />
          )}
          <button
            type="submit"
            style={{
              backgroundColor: '#BA181E',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.75rem 1.35rem',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(186, 24, 30, 0.3)',
            }}
          >
            Search
          </button>
        </form>

        {/* Category Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="/blog"
            style={{
              display: 'inline-block',
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.825rem',
              fontWeight: 700,
              textDecoration: 'none',
              backgroundColor: selectedCategory === 'all' ? '#BA181E' : '#FFFFFF',
              color: selectedCategory === 'all' ? '#FFFFFF' : '#475569',
              border: selectedCategory === 'all' ? '1px solid #BA181E' : '1px solid #E2E8F0',
              boxShadow: selectedCategory === 'all' ? '0 2px 8px rgba(186, 24, 30, 0.3)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            All Articles ({total})
          </a>

          {categories.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <a
                key={cat.id || cat.slug}
                href={`/blog?category=${cat.slug}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`}
                style={{
                  display: 'inline-block',
                  padding: '0.45rem 1.1rem',
                  borderRadius: '9999px',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  backgroundColor: isActive ? '#BA181E' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#475569',
                  border: isActive ? '1px solid #BA181E' : '1px solid #E2E8F0',
                  boxShadow: isActive ? '0 2px 8px rgba(186, 24, 30, 0.3)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat.name}
              </a>
            );
          })}
        </div>
      </div>

      {/* 4. Article Grid — EXACTLY 3 Cards Per Row on Desktop */}
      {posts.length === 0 ? (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '4rem 2rem',
            textAlign: 'center',
            color: '#64748B',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
            No Articles Found
          </h3>
          <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem' }}>
            No published articles currently match your search criteria.
          </p>
          <a
            href="/blog"
            style={{
              display: 'inline-block',
              backgroundColor: '#BA181E',
              color: '#FFFFFF',
              padding: '0.55rem 1.25rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            Reset Filters
          </a>
        </div>
      ) : (
        <div
          className="nidaa-article-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {posts.map((post) => {
            const dateStr = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'Recently Published';

            const coverUrl =
              post.featured_image_url ||
              post.coverImage?.url ||
              '/assets/images/rehabilitation_session.jpg';

            const categoryLabel =
              post.category_name ||
              (post.categories?.[0] ? post.categories[0].replace(/-/g, ' ') : 'Psychiatric Care');

            return (
              <article
                key={post._id || post.id || post.slug}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #EAECEF',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                {/* Featured Cover Image */}
                <a
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    backgroundColor: '#F1F5F9',
                    position: 'relative',
                  }}
                >
                  <img
                    src={coverUrl}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  {/* Category Pill Overlay */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: '#BA181E',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      padding: '0.28rem 0.75rem',
                      borderRadius: '9999px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    }}
                  >
                    {categoryLabel}
                  </span>
                </a>

                {/* Card Content Body */}
                <div
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  {/* Meta: Date & Reading Time */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontSize: '0.78rem',
                      color: '#64748B',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <time>{dateStr}</time>
                    <span>&middot;</span>
                    <span>{post.readingTime || 3} min read</span>
                  </div>

                  {/* Article Title */}
                  <h2
                    style={{
                      fontSize: '1.18rem',
                      fontWeight: 800,
                      lineHeight: 1.35,
                      color: '#0F172A',
                      margin: '0 0 0.75rem 0',
                    }}
                  >
                    <a
                      href={`/blog/${post.slug}`}
                      style={{
                        color: 'inherit',
                        textDecoration: 'none',
                        transition: 'color 0.15s ease',
                      }}
                    >
                      {post.title}
                    </a>
                  </h2>

                  {/* Short Excerpt */}
                  <p
                    style={{
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      color: '#475569',
                      margin: '0 0 1.5rem 0',
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.excerpt || 'Read this clinical psychiatric guide from NiDAA Clinic Lahore.'}
                  </p>

                  {/* Card Footer: Author + Read Link */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: '1px solid #F1F5F9',
                      marginTop: 'auto',
                    }}
                  >
                    {/* Author */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <img
                        src={post.author?.avatar || '/assets/images/dr_bilal_warraich.jpg'}
                        alt={post.author?.name || 'Dr. Bilal Warraich'}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '1.5px solid #BA181E',
                        }}
                      />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B' }}>
                        {post.author?.name || 'Dr. Bilal Warraich'}
                      </span>
                    </div>

                    {/* Read Article Pill Button */}
                    <a
                      href={`/blog/${post.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        color: '#BA181E',
                        fontWeight: 700,
                        fontSize: '0.825rem',
                        textDecoration: 'none',
                      }}
                    >
                      Read Article &rarr;
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* 5. Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '2rem',
          }}
        >
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isCurrent = pageNum === page;
            return (
              <a
                key={pageNum}
                href={`/blog?page=${pageNum}${selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  backgroundColor: isCurrent ? '#BA181E' : '#FFFFFF',
                  color: isCurrent ? '#FFFFFF' : '#334155',
                  border: isCurrent ? '1px solid #BA181E' : '1px solid #E2E8F0',
                  boxShadow: isCurrent ? '0 4px 12px rgba(186, 24, 30, 0.3)' : 'none',
                }}
              >
                {pageNum}
              </a>
            );
          })}
        </div>
      )}

      {/* Structured Data: WebSite & Blog Collection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': 'https://nidaclinic.com/#website',
                url: 'https://nidaclinic.com',
                name: 'NiDAA Clinic Lahore',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://nidaclinic.com/blog?q={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
              },
              {
                '@type': 'Blog',
                '@id': 'https://nidaclinic.com/blog#blog',
                url: 'https://nidaclinic.com/blog',
                name: 'NiDAA Clinic Medical Journal',
                description:
                  'Clinical psychiatric care, medical detoxification, and evidence-based mental health journal in Lahore.',
                publisher: {
                  '@type': 'MedicalOrganization',
                  name: 'NiDAA Clinic Lahore',
                  url: 'https://nidaclinic.com',
                  logo: 'https://nidaclinic.com/assets/images/logo.png',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
