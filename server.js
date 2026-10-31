const http = require('http');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3009;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} is in use. Please terminate existing process or set PORT.`);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, () => {
    console.log(`\n==================================================`);
    console.log(`  NiDAA Clinic (Website + SEO Blog CMS) is LIVE!`);
    console.log(`  > Website:     http://localhost:${port}/`);
    console.log(`  > Public Blog: http://localhost:${port}/blog`);
    console.log(`  > Admin CMS:   http://localhost:${port}/admin/blog`);
    console.log(`==================================================\n`);
  });
}).catch((err) => {
  console.error('Failed to start Next.js application server:', err);
  process.exit(1);
});
