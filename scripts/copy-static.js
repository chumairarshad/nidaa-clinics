const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else if (exists) {
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

const root = process.cwd();
const publicDir = path.join(root, 'public');
const nextServerApp = path.join(root, '.next', 'server', 'app');
const nextStatic = path.join(root, '.next', 'static');
const publicNextStatic = path.join(publicDir, '_next', 'static');

console.log('[copy-static] Syncing prerendered assets to public...');

// 1. Copy _next/static assets
if (fs.existsSync(nextStatic)) {
  copyRecursiveSync(nextStatic, publicNextStatic);
  console.log('[copy-static] Synced .next/static to public/_next/static');
}

// 2. Copy blog.html
const blogHtml = path.join(nextServerApp, 'blog.html');
if (fs.existsSync(blogHtml)) {
  fs.copyFileSync(blogHtml, path.join(publicDir, 'blog.html'));
  const blogDir = path.join(publicDir, 'blog');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
  fs.copyFileSync(blogHtml, path.join(blogDir, 'index.html'));
  console.log('[copy-static] Synced blog.html to public/blog.html and public/blog/index.html');
}

// 3. Copy individual article HTML files
const blogAppDir = path.join(nextServerApp, 'blog');
if (fs.existsSync(blogAppDir)) {
  const files = fs.readdirSync(blogAppDir);
  for (const file of files) {
    if (file.endsWith('.html')) {
      const slug = file.replace(/\.html$/, '');
      const srcFile = path.join(blogAppDir, file);
      
      // Save as public/blog/<slug>.html
      fs.copyFileSync(srcFile, path.join(publicDir, 'blog', file));
      
      // Also save as public/blog/<slug>/index.html for universal clean URL compatibility
      const slugDir = path.join(publicDir, 'blog', slug);
      if (!fs.existsSync(slugDir)) fs.mkdirSync(slugDir, { recursive: true });
      fs.copyFileSync(srcFile, path.join(slugDir, 'index.html'));
      
      console.log(`[copy-static] Synced article: ${slug}`);
    }
  }
}

console.log('[copy-static] All static assets successfully synchronized.');
