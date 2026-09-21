const http = require('http');
const fs = require('fs');
const path = require('path');

let port = parseInt(process.env.PORT, 10) || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

function serveFile(req, res, filePath, stats, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Content-Length': stats.size,
    'Cache-Control': 'no-cache'
  });

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
}

function send404(req, res) {
  const errorPage = path.join(ROOT, '404.html');
  fs.stat(errorPage, (err, stats) => {
    if (!err && stats.isFile()) {
      serveFile(req, res, errorPage, stats, 404);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<!DOCTYPE html><html><head><title>404 Not Found</title></head><body style="font-family:sans-serif;text-align:center;padding:4rem;"><h1>404 Not Found</h1><p><a href="/">Return to Home</a></p></body></html>');
    }
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${port}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Clean redirects/aliases
  if (pathname === '/' || pathname === '' || pathname === '/index') {
    pathname = '/index.html';
  } else if (pathname === '/blog' || pathname === '/blog/') {
    pathname = '/index.html';
  }

  // Strip leading /lahore-psychologists/ prefix if present
  if (pathname.startsWith('/lahore-psychologists/')) {
    pathname = pathname.substring('/lahore-psychologists'.length);
    if (pathname === '' || pathname === '/') pathname = '/index.html';
  }

  const safeSuffix = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(ROOT, safeSuffix);

  // Check direct file
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      serveFile(req, res, filePath, stats);
      return;
    }

    if (!err && stats.isDirectory()) {
      const indexFile = path.join(filePath, 'index.html');
      fs.stat(indexFile, (err2, stats2) => {
        if (!err2 && stats2.isFile()) {
          serveFile(req, res, indexFile, stats2);
        } else {
          send404(req, res);
        }
      });
      return;
    }

    // Try with .html extension (e.g. /our-team -> /our-team.html)
    if (!path.extname(filePath)) {
      const htmlPath = filePath + '.html';
      fs.stat(htmlPath, (err3, stats3) => {
        if (!err3 && stats3.isFile()) {
          serveFile(req, res, htmlPath, stats3);
          return;
        }

        // Try checking inside lahore-psychologists subfolder as fallback
        const subfolderHtmlPath = path.join(ROOT, 'lahore-psychologists', safeSuffix + '.html');
        fs.stat(subfolderHtmlPath, (err4, stats4) => {
          if (!err4 && stats4.isFile()) {
            serveFile(req, res, subfolderHtmlPath, stats4);
            return;
          }
          send404(req, res);
        });
      });
      return;
    }

    // Also check inside lahore-psychologists subfolder
    const subfolderFilePath = path.join(ROOT, 'lahore-psychologists', safeSuffix);
    fs.stat(subfolderFilePath, (err5, stats5) => {
      if (!err5 && stats5.isFile()) {
        serveFile(req, res, subfolderFilePath, stats5);
        return;
      }
      send404(req, res);
    });
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`Port ${port} is already in use. Trying port ${port + 1}...`);
    port += 1;
    server.listen(port);
  } else {
    console.error('Server error:', err);
  }
});

server.listen(port, () => {
  console.log(`\n==================================================`);
  console.log(`  Lahore Psychologists Website is LIVE!`);
  console.log(`  > Local URL: http://localhost:${port}/`);
  console.log(`==================================================\n`);
});
