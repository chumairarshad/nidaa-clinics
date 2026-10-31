const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = 'C:\\Users\\Nexus Computer\\.gemini\\antigravity-ide\\brain\\e7533955-d90f-429b-b1bb-008e3945d225\\admin_white_theme_edit.png';
const cmd = `"${chromePath}" --headless=new --screenshot="${outPath}" --window-size=1400,1200 --hide-scrollbars --virtual-time-budget=9000 "http://localhost:3009/admin/blog/posts/post-rehab-lahore-2026/edit"`;
try {
  execSync(cmd, { stdio: 'inherit', timeout: 50000 });
  console.log('✓ Edit screenshot saved successfully');
} catch (err) {
  console.log('Finished with:', err.message);
}
