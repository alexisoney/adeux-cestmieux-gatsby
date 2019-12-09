import removeAccent from 'remove-accents';

export function createAnchorLink(string) {
  return removeAccent(string)
    .replace(/\W/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/\W$/g, '')
    .toLowerCase();
}

export function frenchNonBreakingSpaces(string) {
  if (typeof string !== 'string') return null;

  return string
    .replace(/ \?/g, ' ?')
    .replace(/ !/g, ' !')
    .replace(/ :/g, ' :');
}
