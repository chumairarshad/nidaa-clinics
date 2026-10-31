import fs from 'fs';
import path from 'path';

export interface LocalPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: any[];
  contentHTML?: string;
  contentText?: string;
  coverImage?: { url: string; alt?: string; caption?: string };
  categories: string[];
  tags: string[];
  author: { name: string; avatar?: string; bio?: string };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: string;
    noIndex?: boolean;
    focusKeyword?: string;
  };
  status: 'draft' | 'published' | 'scheduled' | 'archived' | 'trash';
  trashedAt?: string;
  publishedAt?: string;
  scheduledAt?: string;
  readingTime: number;
  wordCount: number;
  version: number;
  revisions: any[];
  createdAt: string;
  updatedAt: string;
}

export interface LocalCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  postCount: number;
}

interface LocalDBData {
  posts: LocalPost[];
  categories: LocalCategory[];
  media: any[];
  audit: any[];
  redirects: any[];
  settings: any;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'cms-store.json');
const BACKUP_DB_FILE = path.join(process.cwd(), 'data', 'cms-store.json');

const INITIAL_DATA: LocalDBData = {
  posts: [
    {
      _id: 'post-101',
      title: 'Welcome to NiDAA Clinic: Evidence-Based Mental Health & Addiction Recovery',
      slug: 'welcome-to-nidaa-clinic-blog',
      excerpt: 'Comprehensive psychiatric, psychological, and addiction recovery insights led by Medical Director Dr. Bilal Warraich in Lahore.',
      contentHTML: `<h2>Committed to Healing, Recovery, and Mental Wellness</h2>
<p>NiDAA Clinic (National Institute on Drug Abuse and Addiction) provides confidential, ethical, and evidence-based clinical psychiatry and psychological therapy in Lahore.</p>
<h3>Our Core Clinical Methodologies</h3>
<ul>
  <li><strong>Medical Psychiatric Evaluation:</strong> Accurate diagnosis and customized pharmacotherapy when indicated.</li>
  <li><strong>Cognitive Behavioral Therapy (CBT):</strong> Re-structuring distorted thought patterns and fostering resilient coping mechanisms.</li>
  <li><strong>Comprehensive Rehabilitation:</strong> Holistic care addressing biological, psychological, and social dimensions of recovery.</li>
</ul>
<p>If you or a loved one requires confidential consultation, our clinical team is available 24/7 at <strong>0321 7507866</strong>.</p>`,
      contentText: 'Welcome to NiDAA Clinic. Committed to Healing, Recovery, and Mental Wellness...',
      content: [],
      coverImage: {
        url: '/assets/images/hero-1.webp',
        alt: 'NiDAA Clinic Lahore Medical Facility',
      },
      categories: ['addiction-treatment', 'psychiatry-cbt'],
      tags: ['mental health', 'addiction treatment', 'psychology', 'lahore'],
      author: {
        name: 'Dr. Bilal Warraich',
        avatar: '/assets/images/dr-bilal.png',
        bio: 'Medical Director (MBBS MD DPM), Specialist in Addiction Psychiatry and Clinical Psychotherapy.',
      },
      seo: {
        metaTitle: 'Welcome to NiDAA Clinic Blog | Mental Health & Addiction Care Lahore',
        metaDescription: 'Comprehensive psychiatric, psychological, and addiction recovery insights led by Medical Director Dr. Bilal Warraich in Lahore.',
        canonicalUrl: 'https://nidaclinic.com/blog/welcome-to-nidaa-clinic-blog',
        ogType: 'article',
        noIndex: false,
        focusKeyword: 'Psychiatrist in Lahore',
      },
      status: 'published',
      publishedAt: new Date().toISOString(),
      readingTime: 3,
      wordCount: 220,
      version: 1,
      revisions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  categories: [
    {
      _id: 'cat-1',
      name: 'Addiction Treatment',
      slug: 'addiction-treatment',
      description: 'Substance abuse rehabilitation and detox protocols',
      order: 1,
      postCount: 1,
    },
    {
      _id: 'cat-2',
      name: 'Psychiatry & CBT',
      slug: 'psychiatry-cbt',
      description: 'Cognitive behavioral therapy and clinical interventions',
      order: 2,
      postCount: 1,
    },
    {
      _id: 'cat-3',
      name: 'Clinical Psychology',
      slug: 'clinical-psychology',
      description: 'Psychotherapy for depression, anxiety, and trauma',
      order: 3,
      postCount: 0,
    },
    {
      _id: 'cat-4',
      name: 'Wellness & Relapse Prevention',
      slug: 'wellness-recovery',
      description: 'Daily mental resilience and family support',
      order: 4,
      postCount: 0,
    },
  ],
  media: [],
  audit: [],
  redirects: [],
  settings: {
    _id: 'settings',
    postsPerPage: 10,
    commentSystem: 'none',
    listingVariant: 'grid',
    postVariant: 'classic',
  },
};

function readDB(): LocalDBData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (_) {}
    }
    if (!fs.existsSync(DB_FILE)) {
      if (fs.existsSync(BACKUP_DB_FILE)) {
        try {
          const backupRaw = fs.readFileSync(BACKUP_DB_FILE, 'utf-8');
          try { fs.writeFileSync(DB_FILE, backupRaw, 'utf-8'); } catch (_) {}
          return JSON.parse(backupRaw);
        } catch (_) {}
      }
      try { fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8'); } catch (_) {}
      return INITIAL_DATA;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.posts || parsed.posts.length === 0) {
      if (fs.existsSync(BACKUP_DB_FILE)) {
        try {
          const backupParsed = JSON.parse(fs.readFileSync(BACKUP_DB_FILE, 'utf-8'));
          if (backupParsed.posts && backupParsed.posts.length > 0) {
            try { fs.writeFileSync(DB_FILE, JSON.stringify(backupParsed, null, 2), 'utf-8'); } catch (_) {}
            return backupParsed;
          }
        } catch (_) {}
      }
      parsed.posts = INITIAL_DATA.posts;
      try { fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8'); } catch (_) {}
    }
    return parsed;
  } catch (err) {
    console.warn('[local-db] Read error, checking backup or serving initial data:', err);
    if (fs.existsSync(BACKUP_DB_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(BACKUP_DB_FILE, 'utf-8'));
      } catch (_) {}
    }
    return INITIAL_DATA;
  }
}

function writeDB(data: LocalDBData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (_) {}
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[local-db] Failed to write database file:', err);
  }
  try {
    const backupDir = path.dirname(BACKUP_DB_FILE);
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    fs.writeFileSync(BACKUP_DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[local-db] Failed to write backup database file:', err);
  }
}

// Auto-purge items in trash older than 30 days
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function purgeExpiredTrash(db: LocalDBData) {
  const now = Date.now();
  const initialLen = db.posts.length;
  db.posts = db.posts.filter((p) => {
    if (p.status === 'trash' && p.trashedAt) {
      const trashedTime = new Date(p.trashedAt).getTime();
      if (now - trashedTime > THIRTY_DAYS_MS) {
        return false; // Purge
      }
    }
    return true;
  });
  if (db.posts.length !== initialLen) {
    writeDB(db);
  }
}

// Public API
export function getLocalPosts(query?: { status?: string; category?: string; page?: number; limit?: number }) {
  const db = readDB();
  purgeExpiredTrash(db);

  let list = db.posts;

  if (query?.status) {
    if (query.status !== 'all') {
      list = list.filter((p) => p.status === query.status);
    }
  } else {
    // Default: exclude trashed articles
    list = list.filter((p) => p.status !== 'trash');
  }

  if (query?.category && query.category !== 'all') {
    list = list.filter((p) => p.categories.includes(query.category!));
  }

  // Sort descending by publication date
  list.sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());

  const total = list.length;
  const page = query?.page || 1;
  const limit = query?.limit || 10;
  const start = (page - 1) * limit;
  const paginated = list.slice(start, start + limit);

  return { posts: paginated, total, totalPages: Math.ceil(total / limit) };
}

export function getLocalPostBySlug(slug: string): LocalPost | null {
  const db = readDB();
  purgeExpiredTrash(db);
  return db.posts.find((p) => p.slug === slug) || null;
}

export function getLocalPostById(id: string): LocalPost | null {
  const db = readDB();
  purgeExpiredTrash(db);
  return db.posts.find((p) => p._id === id || p.slug === id) || null;
}

export function saveLocalPost(postData: Partial<LocalPost> & { id?: string }): LocalPost {
  const db = readDB();
  const now = new Date().toISOString();
  const targetId = postData._id || postData.id;

  if (targetId) {
    const idx = db.posts.findIndex((p) => p._id === targetId || p.slug === targetId);
    if (idx !== -1) {
      db.posts[idx] = {
        ...db.posts[idx],
        ...postData,
        _id: db.posts[idx]._id,
        updatedAt: now,
      };
      writeDB(db);
      return db.posts[idx];
    }
  }

  // New post
  const newPost: LocalPost = {
    _id: targetId || `post-${Date.now()}`,
    title: postData.title || 'Untitled Article',
    slug: postData.slug || `post-${Date.now()}`,
    excerpt: postData.excerpt || '',
    contentHTML: postData.contentHTML || '',
    contentText: postData.contentText || '',
    content: postData.content || [],
    coverImage: postData.coverImage,
    categories: postData.categories || [],
    tags: postData.tags || [],
    author: postData.author || { name: 'Dr. Bilal Warraich' },
    seo: postData.seo || {},
    status: postData.status || 'draft',
    trashedAt: postData.status === 'trash' ? (postData.trashedAt || now) : undefined,
    publishedAt: postData.status === 'published' ? (postData.publishedAt || now) : postData.publishedAt,
    scheduledAt: postData.scheduledAt,
    readingTime: postData.readingTime || 3,
    wordCount: postData.wordCount || 100,
    version: 1,
    revisions: [],
    createdAt: now,
    updatedAt: now,
  };

  db.posts.unshift(newPost);
  writeDB(db);
  return newPost;
}

export function trashLocalPost(id: string): LocalPost | null {
  const db = readDB();
  const idx = db.posts.findIndex((p) => p._id === id || p.slug === id);
  if (idx !== -1) {
    db.posts[idx].status = 'trash';
    db.posts[idx].trashedAt = new Date().toISOString();
    db.posts[idx].updatedAt = new Date().toISOString();
    writeDB(db);
    return db.posts[idx];
  }
  return null;
}

export function restoreLocalPost(id: string): LocalPost | null {
  const db = readDB();
  const idx = db.posts.findIndex((p) => p._id === id || p.slug === id);
  if (idx !== -1) {
    db.posts[idx].status = 'draft';
    delete db.posts[idx].trashedAt;
    db.posts[idx].updatedAt = new Date().toISOString();
    writeDB(db);
    return db.posts[idx];
  }
  return null;
}

export function deleteLocalPost(id: string): boolean {
  const db = readDB();
  const len = db.posts.length;
  db.posts = db.posts.filter((p) => p._id !== id && p.slug !== id);
  if (db.posts.length !== len) {
    writeDB(db);
    return true;
  }
  return false;
}

export function getLocalCategories(): LocalCategory[] {
  const db = readDB();
  return db.categories;
}

export function saveLocalCategory(cat: Partial<LocalCategory>): LocalCategory {
  const db = readDB();
  if (cat._id) {
    const idx = db.categories.findIndex((c) => c._id === cat._id);
    if (idx !== -1) {
      db.categories[idx] = { ...db.categories[idx], ...cat };
      writeDB(db);
      return db.categories[idx];
    }
  }

  const newCat: LocalCategory = {
    _id: `cat-${Date.now()}`,
    name: cat.name || 'New Category',
    slug: cat.slug || `cat-${Date.now()}`,
    description: cat.description || '',
    order: cat.order || db.categories.length + 1,
    postCount: 0,
  };
  db.categories.push(newCat);
  writeDB(db);
  return newCat;
}

export function getLocalSettings() {
  const db = readDB();
  return db.settings || INITIAL_DATA.settings;
}

export function updateLocalSettings(patch: any) {
  const db = readDB();
  db.settings = { ...db.settings, ...patch };
  writeDB(db);
  return db.settings;
}
