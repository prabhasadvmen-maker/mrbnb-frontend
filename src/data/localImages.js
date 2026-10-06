// All local property and luxury stay images from public/images
export const propertyImages = [
  '/images/edc020124lauder-004-656776cf4986f.avif',
  '/images/86cdbbcd-4cec-4290-920e-9e65601e62b8.avif',
  '/images/c72f97e6-aec7-4518-bffc-d99ecc201777.avif',
  '/images/05136c58-0932-47bb-aefe-1e6b2fcccf03.avif',
  '/images/10decc11-dc78-488a-b566-b792183de8c0.avif',
  '/images/3568ee19-3055-47f0-989b-0fe72e0c347e.avif',
  '/images/39ced943-3586-4466-81c7-5c98919750cf.avif',
  '/images/69d73885-73ae-499b-8200-27d5c98ad326.avif',
  '/images/7a3ed2cd-adfc-4d98-8a0b-7ec9d24dc170.avif',
  '/images/8174d595-62af-4f9a-b376-17ec84494f6d.avif',
  '/images/8292fc82-3706-4f38-bd4d-363bb204c6f7.avif',
  '/images/90115262-dbd1-4981-ac20-daef6450b912.avif',
  '/images/90115262-dbd1-4981-ac20-daef6450b912%20(1).avif',
  '/images/9dbdd9f8-e384-4b54-98ec-b70d20269289.avif',
  '/images/a57e5b24-7a74-4ad6-ac45-02f6d30eea23.avif',
  '/images/b463ab69-92d4-4d54-b0d3-78764e440f6a.avif',
  '/images/ddd4af9f-35fe-4b64-bb7f-8df18b18e4b6.avif',
  '/images/df0b2076-fc23-48a0-833e-9c1f62543849.avif',
  '/images/e95acd37-81e0-4869-97b6-382eaf522758.avif',
  '/images/2c6c24f8-c765-44aa-b699-31f9e5bc72a4.webp',
  '/images/a382d556-f5f8-4c32-a655-ea47d20b1c69.avif',
  '/images/5907afc4-f566-4a0e-8e8c-fad12b4c4f57.avif',
  '/images/e83c714f-2117-4d9d-930c-381bc9f7053e.avif',
  '/images/6923832d-6e02-4d3e-92c7-7050c6f43d64.avif',
  '/images/6e57c392-1eaa-4617-9f88-5fe9fad4a211.avif',
  '/images/8892d15e-611e-4549-b55f-a4a75ea93366.avif',
  '/images/e0fb2d1a-f580-4c14-87cd-6dcdd4ea705b.avif',
  '/images/51d2777f-b9bb-4fe7-9486-1612bf5bc568.avif',
  '/images/60e4b4bc-be75-4aed-8f8c-60714b4269f2.avif',
  '/images/40332445-a70e-49b1-a8ad-8720e2e59868.avif',
  '/images/d5bfd554-2897-43ea-9c82-07cd83fe07ce.avif',
  '/images/97aeb9a4-10a8-421d-9477-7c37a5fc16af.avif',
  '/images/04b3b505-cff3-4d97-96a0-063b0c64450f.avif',
  '/images/91444bf1-3e91-48c6-ab82-87d2d98c9359.avif',
  '/images/124d23b4-8807-4361-b447-ae8d826fc13f.avif',
  '/images/9e3448d1-6c29-4703-a9e2-d002c3ae7a28.avif',
  '/images/dba05ddf-64bf-420d-841d-b28684392d21.avif',
  '/images/37f8d44c-a463-4214-9350-32b7ca3ca811.avif',
  '/images/e6d72426-3641-4063-8363-5e2586fdc9b9.avif',
  '/images/3bde4009-4c72-4a3f-81ff-ec00820383fa.avif'
];

export const getImage = (index) => {
  if (propertyImages.length === 0) return '';
  return propertyImages[Math.abs(index) % propertyImages.length];
};

export const getMultipleImages = (start, count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(getImage(start + i));
  }
  return result;
};
