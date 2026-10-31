/**
 * Comprehensive HTML to ProseMirror / TipTap blocks converter for Next BlogPanel
 */

export interface ProseMirrorNode {
  type: string;
  attrs?: Record<string, any>;
  content?: (ProseMirrorNode | { type: string; text: string; marks?: { type: string; attrs?: Record<string, any> }[] })[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, any> }[];
}

function cleanText(t: string): string {
  return t
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

export function parseInlineToProseMirror(html: string): any[] {
  const parts: any[] = [];
  const regex = /(<strong>|<b>|<\/strong>|<\/b>|<em>|<i>|<\/em>|<\/i>|<a\s+[^>]*href="([^"]*)"[^>]*>|<\/a>|<code>|<\/code>|<br\s*\/?>)/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let marks: { type: string; attrs?: Record<string, any> }[] = [];

  while ((match = regex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      const text = cleanText(html.substring(lastIndex, match.index));
      if (text) {
        parts.push({
          type: 'text',
          text,
          ...(marks.length > 0 ? { marks: [...marks] } : {}),
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
        ...(marks.length > 0 ? { marks: [...marks] } : {}),
      });
    }
  }

  return parts.length > 0 ? parts : [{ type: 'text', text: cleanText(html) || ' ' }];
}

export function htmlToProseMirrorBlocks(html: string): ProseMirrorNode[] {
  if (!html || typeof html !== 'string') return [];
  const nodes: ProseMirrorNode[] = [];

  // Split top-level blocks: <p>, <h2>, <h3>, <h4>, <ul>, <ol>, <blockquote>
  const blockRegex = /<(p|h1|h2|h3|h4|h5|h6|ul|ol|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;
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
        content: parseInlineToProseMirror(inner),
      });
    } else if (tag === 'p') {
      if (inner) {
        nodes.push({
          type: 'paragraph',
          content: parseInlineToProseMirror(inner),
        });
      }
    } else if (tag === 'ul' || tag === 'ol') {
      const isOrdered = tag === 'ol';
      const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
      let liMatch: RegExpExecArray | null;
      const listItems: any[] = [];
      while ((liMatch = liRegex.exec(inner)) !== null) {
        const liInner = liMatch[1].trim();
        listItems.push({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: parseInlineToProseMirror(liInner),
            },
          ],
        });
      }
      if (listItems.length > 0) {
        nodes.push({
          type: isOrdered ? 'orderedList' : 'bulletList',
          content: listItems,
        });
      }
    } else if (tag === 'blockquote') {
      nodes.push({
        type: 'blockquote',
        content: [
          {
            type: 'paragraph',
            content: parseInlineToProseMirror(inner),
          },
        ],
      });
    }
  }

  // Fallback if no block tags matched
  if (matchesCount === 0 && html.trim()) {
    const paragraphs = html.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
    for (const p of paragraphs) {
      nodes.push({
        type: 'paragraph',
        content: parseInlineToProseMirror(p),
      });
    }
  }

  return nodes;
}

export function stripHtmlToText(html: string): string {
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
