/* ==========================================================
   PLACEHOLDER PRODUCT CATALOG + CLOUDINARY INTEGRATION

   Every product has an `image` field holding a Cloudinary PUBLIC ID
   (not a full URL). cloudinaryUrl() below turns that public ID into
   a real, optimized image URL. To use your own photos:
     1. Upload the photo to your Cloudinary account.
     2. Copy its Public ID (Cloudinary shows this after upload).
     3. Paste it into that product's `image` field below.
   No other code needs to change -- sizing/format/quality are all
   handled by the transformation string in cloudinaryUrl().
   ========================================================== */

const CLOUDINARY = {
  cloudName: 'dvcrmkuca',
};

/**
 * Build an optimized Cloudinary delivery URL from a public ID.
 * @param {string} publicId - e.g. 'v1721586155/tech-rev_ybejet'
 * @param {object} [opts]
 * @param {number} [opts.width=600]
 * @param {string} [opts.crop='fill']
 * @param {string} [opts.quality='auto']
 * @param {string} [opts.format='auto']
 */
function cloudinaryUrl(publicId, opts){
  opts = opts || {};
  const width = opts.width || 600;
  const crop = opts.crop || 'fill';
  const quality = opts.quality || 'auto';
  const format = opts.format || 'auto';
  const transform = `f_${format},q_${quality},c_${crop},w_${width}`;
  return `https://res.cloudinary.com/${CLOUDINARY.cloudName}/image/upload/${transform}/${publicId}`;
}

// Single placeholder image (from the sample URL) reused across every
// product/hero slot until real photography is uploaded. Public ID only
// -- the version prefix (v172158...) is part of the public ID string.
const PLACEHOLDER_IMAGE = 'v1721586155/tech-rev_ybejet';

const PRODUCTS = [
  { id: 1, name: 'Ornamental Estate Gate', type: 'gates', style: 'classic', colors: ['gold','black'], tags: ['gate','entrance','ornamental','estate'], pattern: 'gate-classic', image: PLACEHOLDER_IMAGE },
  { id: 2, name: 'Scroll Panel Driveway Gate', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','driveway','scroll'], pattern: 'gate-classic', image: PLACEHOLDER_IMAGE },
  { id: 3, name: 'Slat Sliding Gate', type: 'gates', style: 'modern', colors: ['black','silver'], tags: ['gate','sliding','slat'], pattern: 'gate-modern', image: PLACEHOLDER_IMAGE },
  { id: 4, name: 'Flat Bar Minimal Gate', type: 'gates', style: 'modern', colors: ['black','white'], tags: ['gate','minimal'], pattern: 'gate-modern', image: PLACEHOLDER_IMAGE },

  { id: 5, name: 'Classic Baluster Railing', type: 'railings', style: 'classic', colors: ['black','gold'], tags: ['railing','baluster','balcony'], pattern: 'rail-classic', image: PLACEHOLDER_IMAGE },
  { id: 6, name: 'Glass Panel Railing', type: 'railings', style: 'modern', colors: ['silver','black'], tags: ['railing','glass','balcony'], pattern: 'rail-modern', image: PLACEHOLDER_IMAGE },
  { id: 7, name: 'Cable Wire Railing', type: 'railings', style: 'modern', colors: ['silver'], tags: ['railing','cable','terrace'], pattern: 'rail-modern', image: PLACEHOLDER_IMAGE },
  { id: 8, name: 'Wrought Iron Balcony Rail', type: 'railings', style: 'classic', colors: ['black'], tags: ['railing','wrought iron','balcony'], pattern: 'rail-classic', image: PLACEHOLDER_IMAGE },

  { id: 9, name: 'Spiral Staircase -- Classic', type: 'staircases', style: 'classic', colors: ['black','bronze'], tags: ['staircase','spiral'], pattern: 'stair-classic', image: PLACEHOLDER_IMAGE },
  { id: 10, name: 'Floating Steel Staircase', type: 'staircases', style: 'modern', colors: ['black','silver'], tags: ['staircase','floating'], pattern: 'stair-modern', image: PLACEHOLDER_IMAGE },
  { id: 11, name: 'Straight Flight Staircase', type: 'staircases', style: 'modern', colors: ['silver','white'], tags: ['staircase','straight flight'], pattern: 'stair-modern', image: PLACEHOLDER_IMAGE },

  { id: 12, name: 'Natural Stone Facade Cladding', type: 'facades', style: 'classic', colors: ['bronze','white'], tags: ['facade','stone','cladding','elevation'], pattern: 'facade-classic', image: PLACEHOLDER_IMAGE },
  { id: 13, name: 'HPL Panel Facade', type: 'facades', style: 'modern', colors: ['black','silver'], tags: ['facade','hpl','cladding','elevation'], pattern: 'facade-modern', image: PLACEHOLDER_IMAGE },
  { id: 14, name: 'UPVC Louver Screen Facade', type: 'facades', style: 'modern', colors: ['white','silver'], tags: ['facade','upvc','louver','elevation'], pattern: 'facade-modern', image: PLACEHOLDER_IMAGE },
  { id: 15, name: 'Textured Stone Entrance Wall', type: 'facades', style: 'classic', colors: ['bronze'], tags: ['facade','stone','entrance','elevation'], pattern: 'facade-classic', image: PLACEHOLDER_IMAGE },

  { id: 16, name: 'Car Parking Shed', type: 'sheds', style: 'modern', colors: ['black','silver'], tags: ['shed','canopy','parking','car shed'], pattern: 'shed-modern', image: PLACEHOLDER_IMAGE },
  { id: 17, name: 'Polycarbonate Courtyard Canopy', type: 'sheds', style: 'modern', colors: ['silver','white'], tags: ['shed','canopy','courtyard'], pattern: 'shed-modern', image: PLACEHOLDER_IMAGE },
  { id: 18, name: 'Classic Tin Roof Shed', type: 'sheds', style: 'classic', colors: ['black','bronze'], tags: ['shed','roof'], pattern: 'shed-classic', image: PLACEHOLDER_IMAGE },
];

const COLOR_HEX = {
  black: '#1a1a1a',
  gold: '#d8b23a',
  bronze: '#8a6a3c',
  silver: '#b7bcbe',
  white: '#f4f4f2',
};

const TYPE_LABELS = {
  gates: 'Gates',
  railings: 'Railings',
  staircases: 'Staircases',
  facades: 'Facades',
  sheds: 'Sheds & Canopies',
};
