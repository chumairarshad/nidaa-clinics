import React from 'react';
import { fetchPostBySlug, fetchPublishedPosts } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 3600; // SSG with 1-hour ISR revalidation

export async function generateStaticParams() {
  const { posts } = await fetchPublishedPosts({ limit: 50 });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post || post.status !== 'published') {
    return {
      title: 'Article Not Found | NiDAA Clinic Lahore',
    };
  }

  const title = post.seo?.metaTitle || `${post.title} | NiDAA Clinic Lahore`;
  const description =
    post.seo?.metaDescription || post.excerpt || 'Clinical psychiatric guide from NiDAA Clinic Lahore.';
  const url = `https://nidaclinic.com/blog/${post.slug}`;
  const imageUrl = post.featured_image_url || 'https://nidaclinic.com/assets/images/rehabilitation_session.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      authors: [post.author?.name || 'Dr. Bilal Warraich'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  const categoryName = post.category_name || post.categories?.[0] || 'Psychiatric Care';
  const categorySlug = post.category_slug || post.categories?.[0] || 'psychiatric-care';

  // Fetch up to 3 related published articles from the same category
  const { posts: relatedPosts } = await fetchPublishedPosts({
    category: categorySlug,
    limit: 4,
  });

  const filteredRelated = relatedPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Recently Published';

  const coverUrl =
    post.featured_image_url ||
    post.coverImage?.url ||
    '/assets/images/rehabilitation_session.jpg';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: coverUrl.startsWith('http') ? coverUrl : `https://nidaclinic.com${coverUrl}`,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Dr. Bilal Warraich',
      jobTitle: post.author?.role || 'Medical Director & Consultant Psychiatrist',
      url: 'https://nidaclinic.com/our-team.html',
    },
    publisher: {
      '@type': 'MedicalOrganization',
      name: 'NiDAA Clinic Lahore',
      logo: 'https://nidaclinic.com/assets/images/logo.png',
      url: 'https://nidaclinic.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nidaclinic.com/blog/${post.slug}`,
    },
  };

  return (
    <article style={{ maxWidth: '920px', margin: '0 auto', padding: '2rem 1.5rem 6rem 1.5rem' }}>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem',
          color: '#64748B',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <a href="/" style={{ color: '#64748B', textDecoration: 'none' }}>
          Home
        </a>
        <span>/</span>
        <a href="/blog" style={{ color: '#64748B', textDecoration: 'none' }}>
          Medical Journal
        </a>
        <span>/</span>
        <a
          href={`/blog?category=${categorySlug}`}
          style={{ color: '#64748B', textDecoration: 'none', textTransform: 'capitalize' }}
        >
          {categoryName}
        </a>
        <span>/</span>
        <span style={{ color: '#BA181E', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
          {post.title}
        </span>
      </nav>

      {/* 2. Article Header */}
      <header style={{ marginBottom: '2.5rem' }}>
        {/* Category Pill */}
        <a
          href={`/blog?category=${categorySlug}`}
          style={{
            display: 'inline-block',
            backgroundColor: '#FFF1F1',
            color: '#BA181E',
            border: '1px solid #F8D0D2',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '0.35rem 0.95rem',
            borderRadius: '9999px',
            textDecoration: 'none',
            marginBottom: '1rem',
          }}
        >
          {categoryName}
        </a>

        {/* Title */}
        <h1
          style={{
            fontSize: '2.45rem',
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            color: '#0F172A',
            margin: '0 0 1.25rem 0',
          }}
        >
          {post.title}
        </h1>

        {/* Excerpt Lead */}
        {post.excerpt && (
          <p
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.65,
              color: '#475569',
              margin: '0 0 1.75rem 0',
              fontWeight: 400,
              borderLeft: '3px solid #BA181E',
              paddingLeft: '1rem',
            }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Author Byline & Meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1.25rem 0',
            borderTop: '1px solid #EAECEF',
            borderBottom: '1px solid #EAECEF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <img
              src={post.author?.avatar || '/assets/images/dr_bilal_warraich.jpg'}
              alt={post.author?.name || 'Dr. Bilal Warraich'}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #BA181E',
              }}
            />
            <div>
              <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>
                {post.author?.name || 'Dr. Bilal Warraich'}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                {post.author?.role || 'Consultant Psychiatrist & Medical Director'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.825rem', color: '#64748B' }}>
            <time dateTime={post.publishedAt ? new Date(post.publishedAt).toISOString() : ''}>
              📅 {dateStr}
            </time>
            <span>&middot;</span>
            <span>⏱️ {post.readingTime || 3} min read</span>
          </div>
        </div>
      </header>

      {/* 3. Featured Image */}
      {coverUrl && (
        <div
          style={{
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '3rem',
            backgroundColor: '#F1F5F9',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          }}
        >
          <img
            src={coverUrl}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}

      {/* 4. Article Content Body */}
      <div
        className="nidaa-article-content"
        style={{
          fontSize: '1.1rem',
          lineHeight: '1.85',
          color: '#1E293B',
          marginBottom: '4rem',
        }}
      >
        {typeof post.content === 'string' ? (
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          />
        ) : (
          <p>{post.excerpt || 'Article content'}</p>
        )}
      </div>

      {/* 5. 24/7 Clinical Helpline CTA Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #BA181E 0%, #8E0E14 55%, #63080D 100%)',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          color: '#FFFFFF',
          marginBottom: '4rem',
          boxShadow: '0 16px 40px rgba(186, 24, 30, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🏥</span>
          <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.8rem' }}>
            NiDAA Clinic Care Coordinator
          </span>
        </div>
        <h3 style={{ fontSize: '1.65rem', fontWeight: 800, margin: 0, color: '#FFFFFF', lineHeight: 1.25 }}>
          Need Confidential Psychiatric or Detoxification Assistance?
        </h3>
        <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6 }}>
          Under the clinical direction of Dr. Bilal Warraich (UNODC American Qualified), our multidisciplinary
          team provides round-the-clock inpatient admission, outpatient psychiatry, and dual-diagnosis care.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
          <a
            href="https://wa.me/923217507866?text=Hello%20NiDAA%20Clinic%2C%20I%20need%20assistance."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#8E0E14',
              padding: '0.75rem 1.6rem',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '0.925rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            }}
          >
            Chat with Care Coordinator
          </a>
          <a
            href="tel:+923217507866"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '0.75rem 1.6rem',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.925rem',
              textDecoration: 'none',
            }}
          >
            Call 0321 7507866
          </a>
        </div>
      </div>

      {/* 6. Related Articles */}
      {filteredRelated.length > 0 && (
        <section style={{ borderTop: '1px solid #EAECEF', paddingTop: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Related Clinical Articles
            </h3>
            <a href="/blog" style={{ color: '#BA181E', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
              View All Articles &rarr;
            </a>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {filteredRelated.map((rel) => {
              const relCover =
                rel.featured_image_url ||
                rel.coverImage?.url ||
                '/assets/images/rehabilitation_session.jpg';

              return (
                <div
                  key={rel.slug}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #EAECEF',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <a
                    href={`/blog/${rel.slug}`}
                    style={{ display: 'block', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}
                  >
                    <img
                      src={relCover}
                      alt={rel.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </a>
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#0F172A' }}>
                      <a href={`/blog/${rel.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {rel.title}
                      </a>
                    </h4>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: '#64748B',
                        margin: '0 0 1rem 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        flex: 1,
                      }}
                    >
                      {rel.excerpt}
                    </p>
                    <a
                      href={`/blog/${rel.slug}`}
                      style={{
                        color: '#BA181E',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        textDecoration: 'none',
                        marginTop: 'auto',
                      }}
                    >
                      Read Guide &rarr;
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}
