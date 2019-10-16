export function getTimeToRead(blocks) {
  if (blocks) {
    let wordsCounter = 0;
    blocks.forEach(({component, content}) => {
      if (component === 'text') {
        wordsCounter += content.split(/\s/g).length;
      }
    });

    const wordsPerMinute = 200;
    const timeToRead = Math.ceil(wordsCounter / wordsPerMinute);

    return timeToRead;
  }

  throw new Error('blocks is undefined');
}
