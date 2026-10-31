# NiDAA Clinic — Blog & Admin Panel Complete Setup Guide

Yeh document NiDAA Clinic website ke naye Blog Engine (`next-blogpanel`) aur Admin Dashboard ko chalane, configure karne aur manage karne ke liye mukammal guide hai.

---

## 1. Quick Overview & Architecture

Is integration ki sab se bari khoobi yeh hai ke:
- **Zero Impact on Main Website:** Clinic ke existing pages (`index.html`, `what-we-do.html`, `our-team.html`, `contact-us.html`, waghera) aur clinic ki CSS/styling 100% untouched hain.
- **Isolated Design System:** Blog aur Admin dashboard ka apna independent layout aur styling scope hai jo main website ke design ko disturb nahi karta.
- **Full SEO & AEO Engine:** Dynamic JSON-LD Schema (`BlogPosting`, `Organization`, `BreadcrumbList`), Open Graph, Twitter Cards, Sitemap, RSS Feed, LLM discovery (`llms.txt`), aur Bing/Yandex IndexNow support shaamil hain.

---

## 2. Environment Variables Setup (.env.local)

Project root par `.env.local` file banayi gayi hai. Isme aapko apni MongoDB Atlas aur Secret Key values bharni hain:

```env
# 1. MongoDB Connection String (Atlas Free Tier ya Local)
BLOGPANEL_MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nidaaclinic?retryWrites=true&w=majority

# 2. Admin Master API Key (Kam az kam 32 characters lambi key)
BLOGPANEL_API_KEY=nidaaclinic_secure_master_key_32chars_min_secret

# 3. Public Website URL
NEXT_PUBLIC_SITE_URL=https://nidaclinic.com
BLOGPANEL_SITE_URL=https://nidaclinic.com
BLOGPANEL_SITE_NAME=NiDAA Clinic Blog
```

> **Tip:** Agar aapke paas MongoDB Atlas account nahi hai to aap [mongodb.com/atlas](https://www.mongodb.com/atlas) par ja kar 5 minute mein muft (Free M0) cluster bana sakte hain.

---

## 3. Database Indexes Create Karna (Migration)

Jab aap `.env.local` mein apna valid MongoDB URI daal lein, to terminal par sirf ek martaba yeh command chalayein:

```bash
npx next-blogpanel migrate
```

Yeh command database ke indexes, audit log TTL, aur IndexNow key automatically initialize kar degi.

---

## 4. Localhost Par Kaise Chalana Hai (Testing)

Blog aur Admin dashboard ko test karne ke liye terminal mein yeh command chalayein:

```bash
npm run next:dev
```

Dev server start hone ke baad browser mein yeh URLs open karein:
- **Main Website:** [http://localhost:3009/](http://localhost:3009/)
- **Public Blog:** [http://localhost:3009/blog](http://localhost:3009/blog)
- **Admin Dashboard:** [http://localhost:3009/admin/blog](http://localhost:3009/admin/blog)

*(Existing static server chalane ke liye `npm run dev` ya `node server.js` bhi pehle ki tarah available hai).*

---

## 5. Admin Panel Access Karna & Login

1. Browser mein [http://localhost:3000/admin/blog](http://localhost:3000/admin/blog) (ya production par `https://nidaclinic.com/admin/blog`) open karein.
2. Login screen par aapko do options milenge:
   - **Login with Email & Password**
   - **Use an API key instead** toggle
3. **Pehli martaba login ke liye:** "Use an API key instead" par click karein aur apni `.env.local` wali `BLOGPANEL_API_KEY` paste karein.
4. Login button par click karte hi aap Admin Dashboard mein dakhil ho jayenge!

---

## 6. Client Ke Liye User Banana (Author vs Admin Roles)

Client ko sirf apni posts likhne aur manage karne ki access dene ke liye:

1. Admin Panel ke sidebar mein **Users** (ya **Tokens**) par click karein.
2. **Add New User / Token** par click karein:
   - **Name:** Client ka naam (e.g. *Dr. Bilal Warraich* ya *Clinic Staff*)
   - **Email / Identifier:** Client ka email
   - **Role:** Select karein **`author`**
3. **Roles ka Farq:**
   - **`author`:** Sirf nayi posts likh sakta hai, apni posts edit kar sakta hai, aur images upload kar sakta hai. Client kisi bhi post ko delete nahi kar sakega aur na hi categories/settings ko change kar sakega.
   - **`admin`:** Full access (posts delete karna, categories manage karna, settings badalna).

---

## 7. Nayi Post Kaise Publish Karein

1. Sidebar mein **Posts** -> **New Post** (ya direct URL `/admin/blog/posts/new`) par jayein.
2. **Title:** Article ka title likhein (e.g. *"Understanding Addiction & Cognitive Behavioral Therapy"*).
3. **Content Editor:** TipTap rich text block editor ka istemal karein:
   - `/` type karne se slash commands khulti hain (Headings, Bullet list, Quote, Image, Callout box, Table).
   - Images ko drag & drop karein ya upload button se add karein.
4. **SEO & Settings Tab (Right sidebar):**
   - **Slug:** URL friendly slug (auto-generate ho jata hai, ya customize karein).
   - **Excerpt / Meta Description:** Search engine ke liye 150-160 characters ka summary.
   - **Cover Image:** Featured image select ya upload karein.
   - **Category:** Category select karein (e.g. *Addiction Treatment*, *Psychiatry*, *Mental Health*).
5. **Publish:** Status ko "Published" set karke **Save & Publish** par click karein. Post foran `/blog/[slug]` par live ho jayegi!

---

## 8. Delete Handling & 301 Redirects

- Agar koi post delete ki jaye ya uska slug tabdeel kiya jaye, to Next BlogPanel automatically server-side **301 Permanent Redirect** create karta hai.
- Iska faida yeh hai ke agar kisi purani post ka link Google ya social media par share hua ho, to visitor ko 404 error nahi aayega aur SEO rankings transfer ho jayengi.

---

## 9. Google Search Console Mein Sitemap Kaise Submit Karein

Auto-generated endpoints automatically available hain:
- **XML Sitemap:** `https://nidaclinic.com/sitemap.xml` (aur `https://nidaclinic.com/api/blog/sitemap.xml`)
- **RSS Feed:** `https://nidaclinic.com/rss.xml` (aur `https://nidaclinic.com/api/blog/rss.xml`)
- **Robots.txt:** `https://nidaclinic.com/robots.txt`
- **LLM Context:** `https://nidaclinic.com/llms.txt`

### Search Console Steps:
1. [Google Search Console](https://search.google.com/search-console) mein jayein aur apna property (`https://nidaclinic.com`) select karein.
2. Left menu mein **Sitemaps** option par click karein.
3. "Add a new sitemap" ke input box mein likhein:
   ```
   sitemap.xml
   ```
4. **Submit** button par click karein.
5. Google status "Success" dikha dega aur sitemap ki tamam blog posts ko automatically crawl karna shuru kar dega.

---

## 10. Summary of Routes

| Route | Purpose | Access |
|---|---|---|
| `/` | NiDAA Clinic Main Homepage (Original HTML) | Public |
| `/blog` | Blog Articles Directory & Search | Public |
| `/blog/[slug]` | Full Single Article with Social Share & Author Card | Public |
| `/blog/category/[slug]` | Category-wise Filtered Articles | Public |
| `/admin/blog` | Admin Dashboard Overview | Login Required |
| `/admin/blog/posts` | All Posts Management Table | Login Required |
| `/admin/blog/posts/new` | Rich Block Editor for New Post | Login Required |
| `/admin/blog/posts/[id]/edit` | Edit Post by ID | Login Required |
| `/admin/blog/media` | Image & File Media Library | Login Required |
| `/admin/blog/settings` | Appearance & General Settings | Admin Only |
| `/api/blog/...` | Backend CRUD, Sitemap, RSS, Media endpoints | Secure API |
