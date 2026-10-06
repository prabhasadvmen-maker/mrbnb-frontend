// Automatically load all local property image assets in src/assets
const assetModules = import.meta.glob('../assets/*.{avif,webp,jpg,png}', { eager: true, as: 'url' });

// Filter out background and logos
export const propertyImages = Object.entries(assetModules)
  .filter(([path]) => !path.includes('winter_villa') && !path.includes('wp4110663') && !path.includes('react') && !path.includes('vite') && !path.includes('logo'))
  .map(([_, url]) => url);

export const getImage = (index) => {
  if (propertyImages.length === 0) return '';
  return propertyImages[index % propertyImages.length];
};

export const getMultipleImages = (start, count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(getImage(start + i));
  }
  return result;
};
