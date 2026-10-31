const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Nexus Computer\\.gemini\\antigravity-ide\\brain\\e7533955-d90f-429b-b1bb-008e3945d225';

function snap(name, url, timeBudget = 6000, width = 1400, height = 1100) {
  const outPath = path.join(artifactDir, name);
  console.log(`Capturing ${name} from ${url}...`);
  const cmd = `"${chromePath}" --headless=new --screenshot="${outPath}" --window-size=${width},${height} --hide-scrollbars --virtual-time-budget=${timeBudget} "${url}"`;
  try {
    execSync(cmd, { stdio: 'inherit', timeout: 35000 });
    const sz = fs.statSync(outPath).size;
    console.log(`✓ Saved ${name} (${sz} bytes)`);
  } catch (err) {
    console.error(`Error on ${name}:`, err.message);
  }
}

// 1. Capture Login Page (showing white card, requiring credentials blog@nidclinic.com)
snap('login_screen_white.png', 'http://localhost:3009/admin/blog', 5000, 1400, 950);

// 2. Capture Homepage Blog Section (showing dynamic articles with 'Read More →' buttons)
snap('homepage_blog_functional.png', 'http://localhost:3009/#blog', 6000, 1400, 1100);
