/* ==========================================================
   PLACEHOLDER PRODUCT CATALOG
   Swap `pattern` for a real photo by replacing the product-media
   innerHTML in products.js with an <img> tag once photography is ready.
   ========================================================== */

const PRODUCTS = [
  { id: 1, name: 'Ornamental Estate Gate', type: 'gates', style: 'classic', colors: ['gold','black'], tags: ['gate','entrance','ornamental','estate'], pattern: 'gate-classic' },
  { id: 2, name: 'Scroll Panel Driveway Gate', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','driveway','scroll'], pattern: 'gate-classic' },
  { id: 3, name: 'Slat Sliding Gate', type: 'gates', style: 'modern', colors: ['black','silver'], tags: ['gate','sliding','slat'], pattern: 'gate-modern' },
  { id: 4, name: 'Flat Bar Minimal Gate', type: 'gates', style: 'modern', colors: ['black','white'], tags: ['gate','minimal'], pattern: 'gate-modern' },

  { id: 5, name: 'Classic Baluster Railing', type: 'railings', style: 'classic', colors: ['black','gold'], tags: ['railing','baluster','balcony'], pattern: 'rail-classic' },
  { id: 6, name: 'Glass Panel Railing', type: 'railings', style: 'modern', colors: ['silver','black'], tags: ['railing','glass','balcony'], pattern: 'rail-modern' },
  { id: 7, name: 'Cable Wire Railing', type: 'railings', style: 'modern', colors: ['silver'], tags: ['railing','cable','terrace'], pattern: 'rail-modern' },
  { id: 8, name: 'Wrought Iron Balcony Rail', type: 'railings', style: 'classic', colors: ['black'], tags: ['railing','wrought iron','balcony'], pattern: 'rail-classic' },

  { id: 9, name: 'Spiral Staircase — Classic', type: 'staircases', style: 'classic', colors: ['black','bronze'], tags: ['staircase','spiral'], pattern: 'stair-classic' },
  { id: 10, name: 'Floating Steel Staircase', type: 'staircases', style: 'modern', colors: ['black','silver'], tags: ['staircase','floating'], pattern: 'stair-modern' },
  { id: 11, name: 'Straight Flight Staircase', type: 'staircases', style: 'modern', colors: ['silver','white'], tags: ['staircase','straight flight'], pattern: 'stair-modern' },

  { id: 12, name: 'Natural Stone Facade Cladding', type: 'elevation', style: 'classic', colors: ['bronze','white'], tags: ['elevation','stone','cladding','facade'], pattern: 'elev-classic' },
  { id: 13, name: 'HPL Panel Elevation', type: 'elevation', style: 'modern', colors: ['black','silver'], tags: ['elevation','hpl','cladding','facade'], pattern: 'elev-modern' },
  { id: 14, name: 'UPVC Louver Screen Facade', type: 'elevation', style: 'modern', colors: ['white','silver'], tags: ['elevation','upvc','louver','facade'], pattern: 'elev-modern' },
  { id: 15, name: 'Textured Stone Entrance Wall', type: 'elevation', style: 'classic', colors: ['bronze'], tags: ['elevation','stone','entrance'], pattern: 'elev-classic' },

  { id: 16, name: 'Brass Jali Room Divider', type: 'facade', style: 'classic', colors: ['gold','bronze'], tags: ['facade','jali','divider','screen'], pattern: 'int-classic' },
  { id: 17, name: 'Minimal Steel Partition', type: 'facade', style: 'modern', colors: ['black','silver'], tags: ['facade','partition','divider'], pattern: 'int-modern' },
  { id: 18, name: 'Carved Door Frame', type: 'facade', style: 'classic', colors: ['gold','black'], tags: ['facade','door','frame','carved'], pattern: 'int-classic' },

  { id: 19, name: 'Car Parking Shed', type: 'sheds', style: 'modern', colors: ['black','silver'], tags: ['shed','canopy','parking','car shed'], pattern: 'shed-modern' },
  { id: 20, name: 'Polycarbonate Courtyard Canopy', type: 'sheds', style: 'modern', colors: ['silver','white'], tags: ['shed','canopy','courtyard'], pattern: 'shed-modern' },
  { id: 21, name: 'Classic Tin Roof Shed', type: 'sheds', style: 'classic', colors: ['black','bronze'], tags: ['shed','roof'], pattern: 'shed-classic' },
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
  elevation: 'Elevation Cladding',
  facade: 'Facade',
  sheds: 'Sheds & Canopies',
};
