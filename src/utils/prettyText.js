export default html => {
  return html
    .replace(/\s\?/g, '&nbsp;?')
    .replace(/\s:/g, '&nbsp;:')
    .replace(/\s!/g, '&nbsp;!');
};
