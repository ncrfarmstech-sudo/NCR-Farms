// Utility to strip HTML tags from a string
export function stripHtml(html) {
  if (!html || typeof html !== 'string') return '';
  // Replace <li> with line breaks and bullets
  let text = html.replace(/<li>(.*?)<\/li>/gi, '\n• $1');
  // Replace <br>, <div>, <p> with line breaks
  text = text.replace(/<\/?(br|div|p)[^>]*>/gi, '\n');
  // Remove all other tags
  text = text.replace(/<[^>]+>/g, '');
  // Replace multiple line breaks with a single one
  text = text.replace(/\n{2,}/g, '\n');
  return text.trim();
}
