export const galleryImages = ['#9be487', '#af87ff', '#e9e9ec'].map(
  (fill) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="3" height="2"><rect width="3" height="2" fill="${fill}"/></svg>`)}`
);

export const galleryLabel = 'Example project';
