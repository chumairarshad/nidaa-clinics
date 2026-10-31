const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Nexus Computer\\.gemini\\antigravity-ide\\brain\\e7533955-d90f-429b-b1bb-008e3945d225';

function snap(name, url, timeBudget = 6000, width = 1400, height = 1100) {
  const outPath = path.join(artifactDir, name);
  console.log(`Capturing ${name}...`);
  const cmd = `"${chromePath}" --headless=new --screenshot="${outPath}" --window-size=${width},${height} --hide-scrollbars --virtual-time-budget=${timeBudget} "${url}"`;
  try {
    execSync(cmd, { stdio: 'inherit', timeout: 35000 });
    const sz = fs.statSync(outPath).size;
    console.log(`✓ Saved ${name} (${sz} bytes)`);
  } catch (err) {
    console.error(`Error on ${name}:`, err.message);
  }
}

snap('admin_white_theme_posts.png', 'http://localhost:3009/admin/blog/posts', 6000, 1400, 1100);
snap('admin_white_theme_edit.png', 'http://localhost:3009/admin/blog/posts/post-rehab-lahore-2026/edit', 6000, 1400, 1300);
