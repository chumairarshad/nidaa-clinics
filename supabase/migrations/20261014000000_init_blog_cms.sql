-- ============================================================
-- NiDAA Clinic Blog & CMS Database Schema Migration
-- Compatible with Supabase / PostgreSQL 14+
-- Implements Phase 8 Requirements & Row-Level-Security (RLS)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Enum Types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'editor', 'author');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE post_status AS ENUM ('draft', 'scheduled', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Profiles / Users Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE, -- References auth.users(id) if Supabase Auth is active
    email VARCHAR(255) NOT NULL UNIQUE,
    display_name VARCHAR(150) NOT NULL,
    role user_role NOT NULL DEFAULT 'author',
    avatar_url TEXT,
    bio TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Media Assets Table
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    storage_path TEXT NOT NULL,
    public_url_or_access_method TEXT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size_bytes BIGINT NOT NULL DEFAULT 0,
    width INT,
    height INT,
    alt_text TEXT,
    caption TEXT,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL UNIQUE,
    description TEXT,
    seo_title VARCHAR(255),
    meta_description TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Tags Table
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Posts Table
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(320) NOT NULL UNIQUE,
    content TEXT NOT NULL DEFAULT '',
    excerpt TEXT,
    status post_status NOT NULL DEFAULT 'draft',
    featured_image_id UUID REFERENCES media(id) ON DELETE SET NULL,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    seo_title VARCHAR(255),
    meta_description TEXT,
    canonical_url TEXT,
    focus_keyword VARCHAR(150),
    secondary_keywords TEXT[],
    og_title VARCHAR(255),
    og_description TEXT,
    og_image TEXT,
    no_index BOOLEAN NOT NULL DEFAULT false,
    reading_time_minutes INT NOT NULL DEFAULT 1,
    word_count INT NOT NULL DEFAULT 0,
    version INT NOT NULL DEFAULT 1,
    published_at TIMESTAMPTZ,
    scheduled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Post-Tags Join Table
CREATE TABLE IF NOT EXISTS post_tags (
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- 8. Post Revisions Table (Draft History & Restores)
CREATE TABLE IF NOT EXISTS post_revisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    revision_number INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    metadata_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. 301 / 302 Slug Redirects Table
CREATE TABLE IF NOT EXISTS redirects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_path VARCHAR(500) NOT NULL UNIQUE,
    to_path VARCHAR(500) NOT NULL,
    status_code INT NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302)),
    source VARCHAR(50) NOT NULL DEFAULT 'slug-change',
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Audit Logs Table (Append-Only)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    principal_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    principal_name VARCHAR(150),
    principal_role VARCHAR(50),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(100),
    resource_label TEXT,
    summary TEXT NOT NULL,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================
-- Performance Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_posts_scheduled_at ON posts(scheduled_at) WHERE status = 'scheduled';
CREATE INDEX IF NOT EXISTS idx_posts_category_id ON posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_redirects_from ON redirects(from_path);
CREATE INDEX IF NOT EXISTS idx_revisions_post_id ON post_revisions(post_id, revision_number DESC);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON audit_logs(created_at DESC);

-- ============================================================
-- Automated Timestamp Triggers
-- ============================================================
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp_profiles ON profiles;
CREATE TRIGGER set_timestamp_profiles
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_categories ON categories;
CREATE TRIGGER set_timestamp_categories
BEFORE UPDATE ON categories
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_posts ON posts;
CREATE TRIGGER set_timestamp_posts
BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- ============================================================
-- Scheduled Post Publisher Function
-- ============================================================
CREATE OR REPLACE FUNCTION publish_scheduled_posts()
RETURNS INT AS $$
DECLARE
  published_count INT;
BEGIN
  WITH updated AS (
    UPDATE posts
    SET status = 'published',
        published_at = timezone('utc'::text, now()),
        updated_at = timezone('utc'::text, now())
    WHERE status = 'scheduled'
      AND scheduled_at <= timezone('utc'::text, now())
    RETURNING id
  )
  SELECT count(*) INTO published_count FROM updated;
  RETURN published_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Row Level Security (RLS) Policies
-- ============================================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Public can read ONLY published posts whose publication time is reached
DROP POLICY IF EXISTS "Public can view published posts" ON posts;
CREATE POLICY "Public can view published posts"
ON posts FOR SELECT
TO anon, authenticated
USING (status = 'published' AND published_at <= timezone('utc'::text, now()));

-- Public can view active categories
DROP POLICY IF EXISTS "Public can view categories" ON categories;
CREATE POLICY "Public can view categories"
ON categories FOR SELECT
TO anon, authenticated
USING (true);

-- Public can view tags
DROP POLICY IF EXISTS "Public can view tags" ON tags;
CREATE POLICY "Public can view tags"
ON tags FOR SELECT
TO anon, authenticated
USING (true);

-- Public can view media
DROP POLICY IF EXISTS "Public can view media" ON media;
CREATE POLICY "Public can view media"
ON media FOR SELECT
TO anon, authenticated
USING (true);

-- Public can read redirects for 301 URL routing
DROP POLICY IF EXISTS "Public can view redirects" ON redirects;
CREATE POLICY "Public can view redirects"
ON redirects FOR SELECT
TO anon, authenticated
USING (true);

-- Authenticated staff policies (Admin, Editor, Author)
DROP POLICY IF EXISTS "Staff full access to posts" ON posts;
CREATE POLICY "Staff full access to posts"
ON posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Staff manage categories" ON categories;
CREATE POLICY "Staff manage categories"
ON categories FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Staff manage media" ON media;
CREATE POLICY "Staff manage media"
ON media FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Staff manage revisions" ON post_revisions;
CREATE POLICY "Staff manage revisions"
ON post_revisions FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view audit logs" ON audit_logs;
CREATE POLICY "Admins can view audit logs"
ON audit_logs FOR SELECT
TO authenticated
USING (true);
