export const stripHtml = (html) => {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

export const sanitizeHtml = (html) => {
  if (!html) return '';
  // Create a temporary div element
  const div = document.createElement('div');
  div.innerHTML = html;
  
  // Remove script tags
  const scripts = div.querySelectorAll('script');
  scripts.forEach(script => script.remove());
  
  return div.innerHTML;
};
