import fs from 'fs';
import path from 'path';

const MIME_TYPES: Record<string, string> = {
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
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ siteSlug: string[] }> }
) {
  const { siteSlug } = await params;
  if (!siteSlug || siteSlug.length === 0) {
    return new Response(null, { status: 404 });
  }

  const requestPath = siteSlug.join('/');

  // Skip Next.js internal routes and blog routes
  if (
    requestPath.startsWith('blog') ||
    requestPath.startsWith('admin') ||
    requestPath.startsWith('api') ||
    requestPath.startsWith('_next')
  ) {
    return new Response(null, { status: 404 });
  }

  const root = process.cwd();
  const safeSuffix = path.normalize(requestPath).replace(/^(\.\.[\/\\])+/, '');
  let candidate = path.join(root, safeSuffix);

  // 1. Direct file check (root or public folder)
  if (!fs.existsSync(candidate) || !fs.statSync(candidate).isFile()) {
    const publicCandidate = path.join(root, 'public', safeSuffix);
    if (fs.existsSync(publicCandidate) && fs.statSync(publicCandidate).isFile()) {
      candidate = publicCandidate;
    }
  }

  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    const ext = path.extname(candidate).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = fs.readFileSync(candidate);
    const headers: Record<string, string> = { 'Content-Type': contentType };
    if (ext === '.pdf') {
      const filename = path.basename(candidate);
      headers['Content-Disposition'] = `inline; filename="${filename}"`;
    }
    return new Response(content, { headers });
  }

  // 2. HTML extension check (e.g. /what-we-do -> what-we-do.html)
  const htmlCandidate = candidate + '.html';
  if (fs.existsSync(htmlCandidate) && fs.statSync(htmlCandidate).isFile()) {
    const html = fs.readFileSync(htmlCandidate);
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // 3. Fallback to subfolder if applicable
  const subfolderHtml = path.join(root, 'lahore-psychologists', safeSuffix + '.html');
  if (fs.existsSync(subfolderHtml) && fs.statSync(subfolderHtml).isFile()) {
    const html = fs.readFileSync(subfolderHtml);
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // 4. 404 fallback
  const error404 = path.join(root, '404.html');
  if (fs.existsSync(error404)) {
    const notFoundHtml = fs.readFileSync(error404);
    return new Response(notFoundHtml, {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  return new Response('404 Not Found', { status: 404 });
}
