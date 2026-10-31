const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Nexus Computer\\.gemini\\antigravity-ide\\brain\\e7533955-d90f-429b-b1bb-008e3945d225';
const outPath = path.join(artifactDir, 'homepage_blog_functional.png');

console.log('Capturing homepage blog section preview...');
const cmd = `"${chromePath}" --headless=new --screenshot="${outPath}" --window-size=1400,950 --hide-scrollbars "http://localhost:3009/blog-preview.html"`;

const proc = exec(cmd, (err, stdout, stderr) => {
  if (err) {
    console.error('Error:', err);
  }
  if (fs.existsSync(outPath)) {
    console.log(`✓ Saved homepage_blog_functional.png (${fs.statSync(outPath).size} bytes)`);
  }
  process.exit(0);
});

// Force exit after 10s if chrome hangs
setTimeout(() => {
  if (fs.existsSync(outPath)) {
    console.log(`✓ Timeout exit - file saved (${fs.statSync(outPath).size} bytes)`);
  }
  try { proc.kill(); } catch (e) {}
  process.exit(0);
}, 10000);
