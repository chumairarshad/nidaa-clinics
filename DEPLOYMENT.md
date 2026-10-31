# NiDAA Clinic — Production Blog CMS Deployment & Operations Guide

This guide documents the complete architecture, setup, DNS, database migrations, security policies, and publishing workflow for the NiDAA Clinic Blog Management System.

---

## 1. Architecture & URL Structure

The blog CMS integrates seamlessly with the existing NiDAA Clinic website:

- **Admin Subdomain:** `https://blog-admin.nidaclinic.com` (or `https://admin.nidaclinic.com`)
  - Directly loads the Admin Dashboard via server-side middleware rewriting.
  - Automatically configured with `X-Robots-Tag: noindex, nofollow` to prevent search engine indexing of admin tools.
  - On the main domain, `/admin/blog` remains accessible as well.
- **Public Blog Directory:** `https://nidaclinic.com/blog`
  - Fully integrated with clinic branding and isolated design scope.
  - Dynamic schema.org WebSite & Organization structured data.
- **Public Article Pages:** `https://nidaclinic.com/blog/[slug]`
  - Rich readability typography, breadcrumb navigation, reading progress bar, social share buttons, related posts, and verified author cards.
  - Generates JSON-LD `BlogPosting` and `BreadcrumbList` schema.
  - 301 permanent redirects for changed or updated article slugs.
- **Unified XML Sitemap:** `https://nidaclinic.com/sitemap.xml`
  - Automatically merges main clinic static pages (`/`, `/what-we-do`, `/our-team`, `/awards-certificates`, `/podcast-video`, `/reviews`, `/contact-us`) with all live published blog articles and category directories.
- **Robots Rules:** `https://nidaclinic.com/robots.txt`
  - Explicitly references `https://nidaclinic.com/sitemap.xml` while disallowing private admin/API paths.

---

## 2. Database Setup & Migrations

The CMS supports both PostgreSQL (via Supabase) and MongoDB (Atlas Free Tier):

### Option A: Supabase / PostgreSQL (Phase 8 Schema)

A complete SQL migration script is located at:
`supabase/migrations/20261014000000_init_blog_cms.sql`

It establishes:
1. `posts`: Contains article content, slug uniqueness, publication dates, SEO fields (title, meta description, canonical URL, OG tags, keywords), and status checks (`draft`, `scheduled`, `published`, `archived`).
2. `categories`: Hierarchical category catalog with SEO metadata and slug uniqueness.
3. `tags` & `post_tags`: Taxonomy relationship tables.
4. `media`: Uploaded assets, dimensions, MIME types, and storage paths.
5. `post_revisions`: Full version history with metadata snapshots for draft restores.
6. `profiles`: Administrator, Editor, and Author roles with secure flags.
7. `redirects`: 301 / 302 automated URL redirect mapping.
8. `audit_logs`: Append-only security audit trail with actor details, timestamps, and action summaries.
9. **Row-Level Security (RLS) Policies:**
   - Anonymous visitors have read-only access to published articles where `published_at <= NOW()`.
   - Admin and editor accounts possess authenticated write privileges.

To apply to your Supabase project:
- Open [Supabase Dashboard](https://supabase.com/dashboard) -> Select your project -> **SQL Editor**.
- Paste and run `supabase/migrations/20261014000000_init_blog_cms.sql`.

### Option B: MongoDB Atlas (Free Tier M0)

1. Create a free M0 cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Copy your connection string into `.env.local`:
   ```env
   BLOGPANEL_MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nidaaclinic?retryWrites=true&w=majority
   BLOGPANEL_API_KEY=your_secure_master_key_min_32_characters_secret
   ```
3. Initialize the database indexes and audit retention policy:
   ```bash
   npx next-blogpanel migrate
   ```

---

## 3. Dedicated Admin Subdomain DNS Configuration

To route `https://blog-admin.nidaclinic.com` to the CMS:

1. Log in to your DNS provider (Cloudflare, Namecheap, GoDaddy, or cPanel).
2. Add a new **CNAME** record:
   - **Type:** `CNAME`
   - **Name (Host):** `blog-admin` (or `admin`)
   - **Value (Target):** `cname.vercel-dns.com` (if using Vercel) or your production server IP/domain.
   - **TTL:** `Auto` (or `300` seconds).
3. In your hosting platform (e.g., Vercel):
   - Navigate to **Project Settings** -> **Domains**.
   - Add `blog-admin.nidaclinic.com`.
   - Next.js `middleware.ts` automatically detects requests arriving from `blog-admin.*` and rewrites them to the `/admin/blog` dashboard.

---

## 4. Initial Administrator Provisioning & Authentication

Public registration is disabled by default for security.

### Step 1: Initial Login with Master Key
1. Visit `https://blog-admin.nidaclinic.com` (or `https://nidaclinic.com/admin/blog`).
2. Click **"Use an API key instead"**.
3. Paste the `BLOGPANEL_API_KEY` defined in your `.env.local`.
4. Click **Login** to enter the master dashboard.

### Step 2: Creating Dedicated User Accounts (Author vs Admin)
1. Go to **Users / Tokens** in the sidebar.
2. Click **Add New User**:
   - **Name:** Dr. Bilal Warraich (or Clinic Editor)
   - **Email:** staff@nidaclinic.com
   - **Role:** Select `admin` (full permissions) or `author` (can only draft and edit their own articles; cannot delete posts or alter clinic settings).
   - **Password:** Minimum 8 characters.
3. The user can now log in securely using their Email and Password.

---

## 5. Media Library & Storage Configuration

The CMS automatically supports three media storage options:
1. **Database GridFS (Default):** Uploads are stored directly in the database without any third-party subscription or setup needed.
2. **Supabase Storage:** Store assets in a dedicated `blog-media` public bucket.
3. **Cloudflare R2 / AWS S3:** Zero egress fee cloud storage. Add to `.env.local`:
   ```env
   BLOGPANEL_R2_ACCOUNT_ID=your-account-id
   BLOGPANEL_R2_ACCESS_KEY=your-access-key
   BLOGPANEL_R2_SECRET_KEY=your-secret-key
   BLOGPANEL_R2_BUCKET=blog-media
   BLOGPANEL_R2_PUBLIC_URL=https://media.nidaclinic.com
   ```

---

## 6. How to Write and Publish Your First Article

1. Log in to the Admin Dashboard (`https://blog-admin.nidaclinic.com` or `https://nidaclinic.com/admin/blog`).
2. Click **"Write Post"** (or **Posts** -> **New Post**).
3. **Draft the Article:**
   - Enter your article title (e.g., *Understanding Addiction & Cognitive Behavioral Therapy*).
   - The slug will automatically generate as `understanding-addiction-cognitive-behavioral-therapy`.
   - Use the TipTap rich text block editor:
     - Type `/` to open slash commands (Headings, Bullet list, Blockquote, Callout, Image, Table).
     - Drag & drop images or upload via the Media Picker.
4. **Optimize in SEO Studio (Right Panel):**
   - **Meta Description:** Write 150-160 characters highlighting symptoms and clinical care options.
   - **Focus Keyword:** Enter primary term (e.g., `Addiction Treatment Lahore`).
   - **SEO Checks:** View the on-page SEO completeness score and actionable suggestions.
   - **Internal Links:** Use the built-in AI / Editorial Assistant to suggest verified clinic service links (`/what-we-do`, `/our-team`, `/contact-us`).
5. **Publishing Controls:**
   - **Save Draft:** Saves content with full autosave protection.
   - **Preview:** Inspect the public layout before going live.
   - **Publish Now:** Instantly sets status to `published`.
   - **Schedule Publication:** Set a future date/time. The server publishes the post once the timestamp is reached.
6. **Verify Live:**
   - Visit `https://nidaclinic.com/blog` -> Your post appears at the top.
   - Visit `https://nidaclinic.com/sitemap.xml` -> The new article URL is automatically included.

---

## 7. Google Search Console Setup

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add your property: `https://nidaclinic.com`.
3. In the left navigation, click **Sitemaps**.
4. In the **Add a new sitemap** input field, enter:
   ```
   sitemap.xml
   ```
5. Click **Submit**. Google will crawl `https://nidaclinic.com/sitemap.xml` and index your clinic pages and published articles.

---

## 8. Automated Test Results

To run the automated verification suite at any time:
```bash
npm run test:cms
```

Output:
```
======================================================
  NiDAA Clinic — Production SEO Blog CMS Test Suite
======================================================

--- Test Suite 1: Slugs & URL Structure ---
  ✓ [PASS] Slug generation normalizes spaces and special characters
  ✓ [PASS] Detects duplicate slug and generates unique suffix

--- Test Suite 2: Technical SEO & Structured Data ---
  ✓ [PASS] JSON-LD BlogPosting schema adheres to schema.org specifications
  ✓ [PASS] JSON-LD BreadcrumbList correctly indexes hierarchical navigation

--- Test Suite 3: Sitemap Verification ---
  ✓ [PASS] Sitemap XML produces valid encoding and excludes drafts or admin URLs

--- Test Suite 4: Subdomain & Routing Isolation ---
  ✓ [PASS] Admin subdomain routes root requests to /admin/blog

--- Test Suite 5: Scheduled Publishing Lifecycle ---
  ✓ [PASS] Scheduled publishing evaluates timestamps reliably against UTC

--- Test Suite 6: Security & Authorization ---
  ✓ [PASS] Role-based action guard enforces author vs admin boundaries
  ✓ [PASS] Password security rejects weak passwords under minimum length

--- Test Suite 7: Media Upload Validation ---
  ✓ [PASS] Media upload accepts supported web formats and blocks executables/scripts

======================================================
  Tests Completed: 10 / 10 Passed
======================================================
```
