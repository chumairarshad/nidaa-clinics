const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Nexus Computer\\.gemini\\antigravity-ide\\brain\\e7533955-d90f-429b-b1bb-008e3945d225';
const outPath = path.join(artifactDir, 'homepage_blog_functional.png');
const htmlFile = path.resolve(__dirname, '..', 'public', 'blog-preview.html');

console.log('Capturing from', htmlFile);
const cmd = `"${chromePath}" --headless=new --screenshot="${outPath}" --window-size=1400,1050 --hide-scrollbars "file://${htmlFile.replace(/\\/g, '/')}"`;

try {
  execSync(cmd, { stdio: 'inherit', timeout: 30000 });
  const sz = fs.statSync(outPath).size;
  console.log(`✓ Saved homepage_blog_functional.png (${sz} bytes)`);
} catch (err) {
  console.error('Error:', err.message);
}
