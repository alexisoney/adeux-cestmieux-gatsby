export const sliceCloudinaryUrl = url => {
  const urlAsArray = url.split('');

  let slicedUrl = ['', ''];

  for (let i = 0, n = urlAsArray.length, slashCounter = 0; i < n; i++) {
    const character = urlAsArray[i];
    if (slashCounter < 6) {
      if (character === '/') slashCounter++;
      if (slashCounter !== 6) slicedUrl[0] += character;
    } else {
      slicedUrl[1] += character;
    }
  }

  return slicedUrl;
};
