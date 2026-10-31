const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Nexus Computer\\.gemini\\antigravity-ide\\brain\\e7533955-d90f-429b-b1bb-008e3945d225';

function snap(name, url, timeBudget = 6000) {
  const outPath = path.join(artifactDir, name);
  console.log(`Capturing ${name}...`);
  const cmd = `"${chromePath}" --headless=new --screenshot="${outPath}" --window-size=1400,1000 --hide-scrollbars --virtual-time-budget=${timeBudget} "${url}"`;
  try {
    execSync(cmd, { stdio: 'inherit', timeout: 35000 });
    const sz = fs.statSync(outPath).size;
    console.log(`✓ Saved ${name} (${sz} bytes)`);
  } catch (err) {
    console.error(`Error on ${name}:`, err.message);
  }
}

snap('admin_dashboard_loaded.png', 'http://localhost:3009/admin/blog', 7000);
snap('admin_posts_list.png', 'http://localhost:3009/admin/blog/posts', 7000);
snap('admin_edit_post_view.png', 'http://localhost:3009/admin/blog/posts/post-ice-detox-lahore/edit', 8000);

function snapTall(name, url) {
  const outPath = path.join(artifactDir, name);
  console.log(`Capturing ${name}...`);
  const cmd = `"${chromePath}" --headless=new --screenshot="${outPath}" --window-size=1400,2000 --hide-scrollbars --virtual-time-budget=8000 "${url}"`;
  try {
    execSync(cmd, { stdio: 'inherit', timeout: 35000 });
    const sz = fs.statSync(outPath).size;
    console.log(`✓ Saved ${name} (${sz} bytes)`);
  } catch (err) {
    console.error(`Error on ${name}:`, err.message);
  }
}

snapTall('admin_edit_post_full_seo.png', 'http://localhost:3009/admin/blog/posts/post-ice-detox-lahore/edit');
