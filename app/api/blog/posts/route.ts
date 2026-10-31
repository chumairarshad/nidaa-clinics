import '../../../next-blogpanel.setup';
import { GET as baseGET, POST as basePOST, PUT as basePUT, DELETE as baseDELETE } from 'next-blogpanel/api/posts';
import {
  getLocalPosts,
  getLocalPostById,
  getLocalPostBySlug,
  saveLocalPost,
  deleteLocalPost,
  trashLocalPost,
  restoreLocalPost,
  type LocalPost,
} from '@/lib/local-cms-db';
import { normalizeAuthRequest } from '@/lib/cms-auth';
import { htmlToProseMirrorBlocks, stripHtmlToText } from '@/lib/html-to-prosemirror';

function normalizePostPayload(post: LocalPost) {
  const coverUrl = post.coverImage?.url || (post as any).featured_image_url || '/assets/images/rehabilitation_session.jpg';
  const authorName = post.author?.name || (post as any).author_name || 'Dr. Bilal Warraich';
  const authorRole = (post as any).author?.role || (post as any).author?.bio || (post as any).author_role || 'Consultant Psychiatrist';
  const authorAvatar = post.author?.avatar || (post as any).author_avatar || '/assets/images/dr_bilal_warraich.jpg';
  const seoTitle = post.seo?.metaTitle || (post as any).seo_title || post.title;
  const seoDesc = post.seo?.metaDescription || (post as any).seo_description || post.excerpt || '';
  const catSlug = (post as any).category_slug || post.categories?.[0] || 'clinical-psychology';
  const catName = (post as any).category_name || (post.categories?.[0] ? post.categories[0].replace(/-/g, ' ') : 'Clinical Psychology');

  let docContent: any[] = [];
  if (Array.isArray(post.content) && post.content.length > 0) {
    docContent = post.content;
  } else if (post.contentHTML && post.contentHTML.trim()) {
    docContent = htmlToProseMirrorBlocks(post.contentHTML);
  } else {
    const raw = stripHtmlToText(post.contentText || post.excerpt || post.title);
    const pars = raw.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
    docContent = pars.length
      ? pars.map(p => ({ type: 'paragraph', content: [{ type: 'text', text: p }] }))
      : [{ type: 'paragraph', content: [{ type: 'text', text: post.title }] }];
  }

  const fullCleanText = post.contentText && post.contentText.length > 300
    ? post.contentText
    : (post.contentHTML ? stripHtmlToText(post.contentHTML) : post.excerpt || post.title);

  return {
    ...post,
    id: post._id,
    _id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    content: docContent,
    content_raw: docContent,
    contentHTML: post.contentHTML || (typeof post.content === 'string' ? post.content : '') || '',
    contentText: fullCleanText,
    content_text: fullCleanText,
    coverImage: post.coverImage || { url: coverUrl, alt: post.title },
    featured_image_url: coverUrl,
    categories: post.categories || [catSlug],
    category_id: catSlug,
    category_slug: catSlug,
    category_name: catName,
    tags: post.tags || [],
    author: {
      name: authorName,
      role: authorRole,
      bio: authorRole,
      avatar: authorAvatar,
    },
    author_name: authorName,
    author_role: authorRole,
    author_avatar: authorAvatar,
    seo: {
      metaTitle: seoTitle,
      metaDescription: seoDesc,
      canonicalUrl: post.seo?.canonicalUrl || `https://nidaclinic.com/blog/${post.slug}`,
      ogImage: post.seo?.ogImage || coverUrl,
      ogType: post.seo?.ogType || 'article',
      focusKeyword: post.seo?.focusKeyword || '',
    },
    seo_title: seoTitle,
    seo_description: seoDesc,
    status: post.status,
    published_at: post.publishedAt || null,
    publishedAt: post.publishedAt || null,
    trashed_at: post.trashedAt || null,
    trashedAt: post.trashedAt || null,
    reading_time: post.readingTime || 4,
    readingTime: post.readingTime || 4,
    created_at: post.createdAt,
    createdAt: post.createdAt,
    updated_at: post.updatedAt,
    updatedAt: post.updatedAt,
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const idParam = url.searchParams.get('id');
  const slugParam = url.searchParams.get('slug');

  // Direct single-post request
  if (idParam || slugParam) {
    const post = idParam ? getLocalPostById(idParam) : getLocalPostBySlug(slugParam!);
    if (post) {
      return Response.json({ success: true, data: normalizePostPayload(post) });
    }
  }

  if (!process.env.BLOGPANEL_MONGODB_URI) {
    const status = url.searchParams.get('status') || void 0;
    const category = url.searchParams.get('category') || void 0;
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);

    const result = getLocalPosts({ status, category, page, limit });
    return Response.json({
      success: true,
      data: result.posts.map(normalizePostPayload),
      meta: {
        page,
        limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  }

  try {
    const req = normalizeAuthRequest(request);
    const response = await baseGET(req);
    if (!response.ok) {
      throw new Error('baseGET not ok');
    }
    return response;
  } catch {
    // If asking for a single post by id or slug
    if (idParam || slugParam) {
      const post = idParam ? getLocalPostById(idParam) : getLocalPostBySlug(slugParam!);
      if (!post) {
        return Response.json({ success: false, error: 'Post not found' }, { status: 404 });
      }
      return Response.json({ success: true, data: normalizePostPayload(post) });
    }

    const status = url.searchParams.get('status') || void 0;
    const category = url.searchParams.get('category') || void 0;
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);

    const result = getLocalPosts({ status, category, page, limit });
    return Response.json({
      success: true,
      data: result.posts.map(normalizePostPayload),
      meta: {
        page,
        limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const clone = request.clone();
    const req = normalizeAuthRequest(request);
    const response = await basePOST(req);
    if (!response.ok) {
      const body = await clone.json();
      const saved = saveLocalPost(body);
      return Response.json({ success: true, data: normalizePostPayload(saved) });
    }
    return response;
  } catch {
    const body = await request.json();
    const saved = saveLocalPost(body);
    return Response.json({ success: true, data: normalizePostPayload(saved) });
  }
}

export async function PUT(request: Request) {
  try {
    const clone = request.clone();
    const req = normalizeAuthRequest(request);
    const response = await basePUT(req);
    if (!response.ok) {
      const body = await clone.json();
      const url = new URL(request.url);
      const id = url.searchParams.get('id') || body._id || body.id;

      if (body.action === 'restore') {
        const restored = restoreLocalPost(id);
        return Response.json({ success: true, data: restored ? normalizePostPayload(restored) : null });
      }
      if (body.action === 'trash') {
        const trashed = trashLocalPost(id);
        return Response.json({ success: true, data: trashed ? normalizePostPayload(trashed) : null });
      }

      const saved = saveLocalPost({ ...body, _id: id });
      return Response.json({ success: true, data: normalizePostPayload(saved) });
    }
    return response;
  } catch {
    const body = await request.json();
    const url = new URL(request.url);
    const id = url.searchParams.get('id') || body._id || body.id;

    if (body.action === 'restore') {
      const restored = restoreLocalPost(id);
      return Response.json({ success: true, data: restored ? normalizePostPayload(restored) : null });
    }
    if (body.action === 'trash') {
      const trashed = trashLocalPost(id);
      return Response.json({ success: true, data: trashed ? normalizePostPayload(trashed) : null });
    }

    const saved = saveLocalPost({ ...body, _id: id });
    return Response.json({ success: true, data: normalizePostPayload(saved) });
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id') || '';
  const permanent = url.searchParams.get('permanent') === 'true';

  if (!id) {
    return Response.json({ success: false, error: 'Missing article ID' }, { status: 400 });
  }

  if (permanent) {
    deleteLocalPost(id);
    return Response.json({ success: true, message: 'Article permanently deleted' });
  } else {
    trashLocalPost(id);
    return Response.json({ success: true, message: 'Article moved to trash for 30 days retention' });
  }
}
