export function createAnchorLink(string) {
  return toAscii(string)
    .replace(/\W/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/\W$/g, '')
    .toLowerCase();
}

function toAscii(string) {
  let result = '';

  for (let i = 0; i < string.length; i++) {
    const ch = string.charCodeAt(i);

    if (ch < 128) {
      result += string.charAt(i);
    }
  }

  return result;
}
