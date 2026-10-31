const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Nexus Computer\\.gemini\\antigravity-ide\\brain\\e7533955-d90f-429b-b1bb-008e3945d225';

if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

const targets = [
  {
    name: 'homepage_4_articles.png',
    url: 'http://localhost:3009/index.html',
    width: 1400,
    height: 1800,
  },
  {
    name: 'public_blog_catalog.png',
    url: 'http://localhost:3009/blog',
    width: 1400,
    height: 1400,
  },
  {
    name: 'public_article_unified_header.png',
    url: 'http://localhost:3009/blog/understanding-ice-crystal-meth-addiction-medical-detox',
    width: 1400,
    height: 1400,
  },
  {
    name: 'public_rehab_article.png',
    url: 'http://localhost:3009/blog/best-rehabilitation-centre-in-lahore',
    width: 1400,
    height: 1400,
  },
  {
    name: 'admin_login_or_dashboard.png',
    url: 'http://localhost:3009/admin/blog',
    width: 1400,
    height: 1000,
  },
  {
    name: 'admin_edit_post_populated.png',
    url: 'http://localhost:3009/admin/blog/posts/post-ice-detox-lahore/edit',
    width: 1400,
    height: 1200,
  }
];

console.log('Capturing screenshots with Google Chrome...');

for (const t of targets) {
  const outPath = path.join(artifactDir, t.name);
  console.log(`\nCapturing: ${t.name} from ${t.url}`);
  try {
    const cmd = `"${chromePath}" --headless=new --screenshot="${outPath}" --window-size=${t.width},${t.height} --hide-scrollbars --virtual-time-budget=4000 "${t.url}"`;
    execSync(cmd, { stdio: 'inherit', timeout: 30000 });
    if (fs.existsSync(outPath)) {
      const stats = fs.statSync(outPath);
      console.log(`✓ Saved ${t.name} (${stats.size} bytes)`);
    } else {
      console.error(`✗ Failed to generate ${t.name}`);
    }
  } catch (err) {
    console.error(`Error capturing ${t.name}:`, err.message);
  }
}

console.log('\nAll screenshots processed!');
