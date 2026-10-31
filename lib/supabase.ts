import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getLocalPosts, getLocalPostBySlug, getLocalCategories, LocalPost, LocalCategory } from './local-cms-db';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  '';

let supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabaseClient) return supabaseClient;
  if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
    try {
      supabaseClient = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      });
      return supabaseClient;
    } catch (err) {
      console.warn('[supabase] Client initialization error:', err);
      return null;
    }
  }
  return null;
}

export interface UnifiedPost {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: any;
  contentHTML?: string;
  featured_image_url?: string;
  coverImage?: { url: string; alt?: string };
  category?: string;
  category_slug?: string;
  category_name?: string;
  categories: string[];
  tags: string[];
  status: 'draft' | 'published' | 'archived' | 'scheduled' | 'trash';
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  };
  readingTime: number;
  wordCount: number;
  publishedAt?: string | Date;
  published_at?: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

function mapSupabaseToUnified(row: any): UnifiedPost {
  const publishedDate = row.published_at ? new Date(row.published_at) : new Date();
  const createdDate = row.created_at ? new Date(row.created_at) : new Date();
  const updatedDate = row.updated_at ? new Date(row.updated_at) : new Date();

  return {
    _id: row.id,
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    contentHTML: typeof row.content === 'string' ? row.content : undefined,
    featured_image_url: row.featured_image_url,
    coverImage: row.featured_image_url
      ? { url: row.featured_image_url, alt: row.title }
      : undefined,
    category: row.category_slug || row.category_name,
    category_slug: row.category_slug,
    category_name: row.category_name,
    categories: row.category_slug ? [row.category_slug] : ['psychiatric-care'],
    tags: Array.isArray(row.tags) ? row.tags : [],
    status: row.status,
    author: {
      name: row.author_name || 'Dr. Bilal Warraich',
      role: row.author_role || 'Consultant Psychiatrist & Medical Director',
      avatar: row.author_avatar || '/assets/images/dr_bilal_warraich.jpg',
    },
    seo: {
      metaTitle: row.seo_title || row.title,
      metaDescription: row.seo_description || row.excerpt,
    },
    readingTime: row.reading_time || 3,
    wordCount: row.word_count || 500,
    publishedAt: publishedDate,
    published_at: publishedDate,
    createdAt: createdDate,
    updatedAt: updatedDate,
  };
}

export async function fetchPublishedPosts(options: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
} = {}): Promise<{ posts: UnifiedPost[]; total: number; totalPages: number }> {
  const page = options.page || 1;
  const limit = options.limit || 9; // Exactly 3 per row on desktop
  const client = getSupabase();

  if (client) {
    try {
      let query = client
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false });

      if (options.category && options.category !== 'all') {
        query = query.eq('category_slug', options.category);
      }

      if (options.search) {
        query = query.or(`title.ilike.%${options.search}%,excerpt.ilike.%${options.search}%`);
      }

      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;

      if (!error && data && data.length > 0) {
        return {
          posts: data.map(mapSupabaseToUnified),
          total: count || data.length,
          totalPages: Math.ceil((count || data.length) / limit),
        };
      }
    } catch (err) {
      console.warn('[supabase] Fetch error, falling back to local store:', err);
    }
  }

  // Graceful fallback to local CMS store
  const local = getLocalPosts({
    status: 'published',
    category: options.category !== 'all' ? options.category : undefined,
    page,
    limit,
  });

  return {
    posts: local.posts.map((p) => {
      const pubDate = p.publishedAt ? new Date(p.publishedAt) : new Date();
      const coverUrl = p.coverImage?.url || (p as any).featured_image_url || '/assets/images/rehabilitation_session.jpg';
      return {
        ...p,
        content: p.contentHTML || (p as any).contentText || p.content || '',
        featured_image_url: coverUrl,
        coverImage: p.coverImage || { url: coverUrl, alt: p.title },
        category_slug: p.categories?.[0] || 'psychiatric-care',
        category_name: p.categories?.[0] ? p.categories[0].replace(/-/g, ' ') : 'Psychiatric Care',
        published_at: pubDate,
        publishedAt: pubDate,
      };
    }),
    total: local.total,
    totalPages: local.totalPages,
  };
}

export async function fetchPostBySlug(slug: string): Promise<UnifiedPost | null> {
  const client = getSupabase();

  if (client) {
    try {
      const { data, error } = await client
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .maybeSingle();

      if (!error && data) {
        return mapSupabaseToUnified(data);
      }
    } catch (err) {
      console.warn('[supabase] Fetch by slug error, falling back:', err);
    }
  }

  // Fallback to local CMS store
  const local = getLocalPostBySlug(slug);
  if (!local) return null;
  const pubDate = local.publishedAt ? new Date(local.publishedAt) : new Date();
  const coverUrl = local.coverImage?.url || (local as any).featured_image_url || '/assets/images/rehabilitation_session.jpg';
  return {
    ...local,
    content: local.contentHTML || local.contentText || '',
    featured_image_url: coverUrl,
    coverImage: local.coverImage || { url: coverUrl, alt: local.title },
    category_slug: local.categories?.[0] || 'psychiatric-care',
    category_name: local.categories?.[0] ? local.categories[0].replace(/-/g, ' ') : 'Psychiatric Care',
    published_at: pubDate,
    publishedAt: pubDate,
  };
}

export async function fetchCategories(): Promise<{ id: string; name: string; slug: string; description?: string }[]> {
  const client = getSupabase();

  if (client) {
    try {
      const { data, error } = await client
        .from('blog_categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
        }));
      }
    } catch (err) {
      console.warn('[supabase] Fetch categories error:', err);
    }
  }

  // Fallback to local store
  const local = getLocalCategories();
  return local.map((c) => ({
    id: c._id,
    name: c.name,
    slug: c.slug,
    description: c.description,
  }));
}
