const fs = require('fs');
const path = require('path');

function cleanText(t) {
  return t
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function parseInline(html) {
  const parts = [];
  const regex = /(<strong>|<b>|<\/strong>|<\/b>|<em>|<i>|<\/em>|<\/i>|<a\s+[^>]*href="([^"]*)"[^>]*>|<\/a>|<code>|<\/code>|<br\s*\/?>)/gi;
  let lastIndex = 0;
  let match;
  let marks = [];

  while ((match = regex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      const text = cleanText(html.substring(lastIndex, match.index));
      if (text) {
        parts.push({
          type: 'text',
          text,
          ...(marks.length > 0 ? { marks: [...marks] } : {})
        });
      }
    }
    const tag = match[1].toLowerCase();
    if (tag.startsWith('<strong') || tag.startsWith('<b')) {
      marks.push({ type: 'bold' });
    } else if (tag.startsWith('</strong') || tag.startsWith('</b')) {
      marks = marks.filter(m => m.type !== 'bold');
    } else if (tag.startsWith('<em') || tag.startsWith('<i')) {
      marks.push({ type: 'italic' });
    } else if (tag.startsWith('</em') || tag.startsWith('</i')) {
      marks = marks.filter(m => m.type !== 'italic');
    } else if (tag.startsWith('<code')) {
      marks.push({ type: 'code' });
    } else if (tag.startsWith('</code')) {
      marks = marks.filter(m => m.type !== 'code');
    } else if (tag.startsWith('<a')) {
      const href = match[2] || '';
      marks.push({ type: 'link', attrs: { href, target: '_blank' } });
    } else if (tag.startsWith('</a')) {
      marks = marks.filter(m => m.type !== 'link');
    } else if (tag.startsWith('<br')) {
      parts.push({ type: 'hardBreak' });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < html.length) {
    const text = cleanText(html.substring(lastIndex));
    if (text) {
      parts.push({
        type: 'text',
        text,
        ...(marks.length > 0 ? { marks: [...marks] } : {})
      });
    }
  }

  return parts.length > 0 ? parts : [{ type: 'text', text: cleanText(html) || ' ' }];
}

function htmlToProseMirror(html) {
  if (!html || typeof html !== 'string') return [];
  const nodes = [];

  const blockRegex = /<(p|h1|h2|h3|h4|h5|h6|ul|ol|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  let matchesCount = 0;

  while ((match = blockRegex.exec(html)) !== null) {
    matchesCount++;
    const tag = match[1].toLowerCase();
    const inner = match[2].trim();

    if (tag.startsWith('h')) {
      const level = parseInt(tag.charAt(1), 10) || 2;
      nodes.push({
        type: 'heading',
        attrs: { level },
        content: parseInline(inner)
      });
    } else if (tag === 'p') {
      if (inner) {
        nodes.push({
          type: 'paragraph',
          content: parseInline(inner)
        });
      }
    } else if (tag === 'ul' || tag === 'ol') {
      const isOrdered = tag === 'ol';
      const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
      let liMatch;
      const listItems = [];
      while ((liMatch = liRegex.exec(inner)) !== null) {
        const liInner = liMatch[1].trim();
        listItems.push({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: parseInline(liInner)
            }
          ]
        });
      }
      if (listItems.length > 0) {
        nodes.push({
          type: isOrdered ? 'orderedList' : 'bulletList',
          content: listItems
        });
      }
    } else if (tag === 'blockquote') {
      nodes.push({
        type: 'blockquote',
        content: [
          {
            type: 'paragraph',
            content: parseInline(inner)
          }
        ]
      });
    }
  }

  if (matchesCount === 0 && html.trim()) {
    const paragraphs = html.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
    for (const p of paragraphs) {
      nodes.push({
        type: 'paragraph',
        content: parseInline(p)
      });
    }
  }

  return nodes;
}

function stripHtml(html) {
  if (!html) return '';
  return cleanText(
    html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<\/h[1-6]>/gi, '\n\n')
      .replace(/<\/li>/gi, '\n')
      .replace(/<br\s*[\/]?>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n\s*\n+/g, '\n\n')
      .trim()
  );
}

const storePath = path.join(__dirname, '..', '.data', 'cms-store.json');
const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));

for (const p of store.posts) {
  if (p.contentHTML) {
    p.content = htmlToProseMirror(p.contentHTML);
    p.contentText = stripHtml(p.contentHTML);
    const words = p.contentText.split(/\s+/).filter(Boolean).length;
    p.wordCount = words;
    p.readingTime = Math.max(1, Math.ceil(words / 220));
    console.log(`Updated post [${p.slug}]: ${p.content.length} blocks, ${words} words`);
  }
}

fs.writeFileSync(storePath, JSON.stringify(store, null, 2), 'utf8');
console.log('✓ Successfully updated all posts in cms-store.json with full ProseMirror blocks and word counts!');
