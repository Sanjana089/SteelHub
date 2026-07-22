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

// Single placeholder image
const PLACEHOLDER_IMAGE = 'v1721586155/tech-rev_ybejet';

const PRODUCTS = [
  { id: 78, name: 'Perforated Letter Gate', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','letter'], pattern: 'gate-classic', images: ['v1783702304/SteelHub/Classic/Gates/40_wduiga', 'v1783702307/SteelHub/Classic/Gates/40.1_fn7nz7'] },
  { id: 79, name: 'Thapa Embossed Square', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','thapa'], pattern: 'gate-classic', image: 'v1783702301/SteelHub/Classic/Gates/4_j5hujy' },
  { id: 80, name: 'Jaipur style', type: 'gates', style: 'classic', colors: ['black','bronze', 'brown'], tags: ['gate','classic','jaipur'], pattern: 'gate-classic', image: 'v1783702258/SteelHub/Classic/Gates/66_pbvkxf' },
  { id: 81, name: 'Degi Spiked Gate', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','degi'], pattern: 'gate-classic', image: 'v1783702258/SteelHub/Classic/Gates/65_bja54p' },
  { id: 82, name: 'Vertical Profile with Shells', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','driveway'], pattern: 'gate-classic', image: 'v1783702239/SteelHub/Classic/Gates/58_rujop1' },
  { id: 83, name: 'King Style Degi', type: 'gates', style: 'classic', colors: ['black'], tags: ['gate','classic','degi'], pattern: 'gate-classic', image: 'v1783702255/SteelHub/Classic/Gates/63_sr0i2m' },
  { id: 84, name: 'Grand Entry Sunflower Style Gate', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','sun', 'sunflower'], pattern: 'gate-classic', image: 'v1783702224/SteelHub/Classic/Gates/59_gqvnaa' },
  { id: 85, name: 'Sun Style Gate', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','sun', 'circle', 'geometric'], pattern: 'gate-classic', image: 'v1783702232/SteelHub/Classic/Gates/53_ziorwy' },
  { id: 86, name: 'Classic Surya Gate', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','sun'], pattern: 'gate-classic', image: 'v1783702223/SteelHub/Classic/Gates/61_ismrqo' },
  { id: 87, name: 'Jaipur style textured Gate', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','border'], pattern: 'gate-classic', image: 'v1783702223/SteelHub/Classic/Gates/55_xj2nfw' },
  { id: 88, name: 'Jaipur style with wooden panels', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','monogram'], pattern: 'gate-classic', image: 'v1783702226/SteelHub/Classic/Gates/60_u3bdbu' },
  { id: 89, name: 'Teer', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','arc'], pattern: 'gate-classic', image: 'v1783702219/SteelHub/Classic/Gates/57_bcnzjx' },
  { id: 90, name: 'Bird Flock Gate', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','palace'], pattern: 'gate-classic', image: 'v1783702220/SteelHub/Classic/Gates/54_pei5fx' },
  { id: 91, name: 'Grand Minor Gate', type: 'gates', style: 'classic', colors: ['brown','white'], tags: ['gate','classic','manor'], pattern: 'gate-classic', image: 'v1783702220/SteelHub/Classic/Gates/45_ump7wp' },
  { id: 96, name: 'Grand Major Gate', type: 'gates', style: 'classic', colors: ['brown','white'], tags: ['gate','classic','panel'], pattern: 'gate-classic', image: 'v1783702203/SteelHub/Classic/Gates/44_mfty0c' },
  { id: 100, name: 'Vintage Crest Gate', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','vintage'], pattern: 'gate-classic', image: 'v1783702187/SteelHub/Classic/Gates/42_frwbxq' },
  { id: 92, name: 'Golden Hexagons Gate', type: 'gates', style: 'classic', colors: ['gold','bronze'], tags: ['gate','classic','powder'], pattern: 'gate-classic', image: 'v1783702218/SteelHub/Classic/Gates/56_nrxfsk' },
  { id: 93, name: 'Traditional Drive Gate', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','traditional'], pattern: 'gate-classic', image: 'v1783702207/SteelHub/Classic/Gates/52_bw1bby' },
  { id: 94, name: 'Degi with Wooden Panels Gate', type: 'gates', style: 'classic', colors: ['brown','black'], tags: ['gate','classic','degi'], pattern: 'gate-classic', image: 'v1783702207/SteelHub/Classic/Gates/47_vctu4w' },
  { id: 95, name: 'Baroque Frame Gate', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','baroque'], pattern: 'gate-classic', image: 'v1783702208/SteelHub/Classic/Gates/51_lgptax' },
  { id: 97, name: 'Courtly Border Gate', type: 'gates', style: 'classic', colors: ['silver'], tags: ['gate','classic','court'], pattern: 'gate-classic', image: 'v1783702202/SteelHub/Classic/Gates/49_liv3q3' },
  { id: 98, name: 'Antique Drive Gate', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','antique'], pattern: 'gate-classic', image: 'v1783702199/SteelHub/Classic/Gates/50_p7vd6k' },
  { id: 99, name: 'Heritage Sun Gate', type: 'gates', style: 'classic', colors: ['silver','gold'], tags: ['gate','classic','lattice'], pattern: 'gate-classic', image: 'v1783702198/SteelHub/Classic/Gates/48_apbjun' },
  { id: 101, name: 'Stamp Gate', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','stamp'], pattern: 'gate-classic', image: 'v1783702152/SteelHub/Classic/Gates/39_wfxins' },
  { id: 102, name: 'Old Town Gate', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','town'], pattern: 'gate-classic', image: 'v1783702151/SteelHub/Classic/Gates/43_mrmlmq' },
  { id: 103, name: 'Wrought Arc Gate', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','wrought'], pattern: 'gate-classic', image: 'v1783702149/SteelHub/Classic/Gates/41_ijf0sl' },
  { id: 104, name: 'Shadow Frame Gate', type: 'gates', style: 'classic', colors: ['black','brown'], tags: ['gate','classic','shadow'], pattern: 'gate-classic', image: 'v1783702128/SteelHub/Classic/Gates/37_y1790e' },
  { id: 105, name: 'Legacy Iron Gate', type: 'gates', style: 'classic', colors: ['black','beige'], tags: ['gate','classic','legacy'], pattern: 'gate-classic', images: ['v1783702122/SteelHub/Classic/Gates/37.2_nek9d4', 'v1783702116/SteelHub/Classic/Gates/37.3_ttdbmx'] },
  { id: 106, name: 'Classic Lattice Gate', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','lattice'], pattern: 'gate-classic', image: 'v1783702119/SteelHub/Classic/Gates/36_co4w0u' },
  { id: 107, name: 'Elite Forge Gate', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','elite'], pattern: 'gate-classic', image: 'v1783702118/SteelHub/Classic/Gates/38_jhqanv' },
  { id: 109, name: 'Decor Clear Gate', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','screen'], pattern: 'gate-classic', image: 'v1783702109/SteelHub/Classic/Gates/33_phiqyn' },
  { id: 111, name: 'Estate Elegance Gate', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','elegance'], pattern: 'gate-classic', image: 'v1783702104/SteelHub/Classic/Gates/35_edx9f4' },
  { id: 112, name: 'Imperial Heritage Gate', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','imperial'], pattern: 'gate-classic', image: 'v1783702103/SteelHub/Classic/Gates/31_ry0dsg' },
  { id: 113, name: 'Classic Plaza Gate', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','plaza'], pattern: 'gate-classic', image: 'v1783702102/SteelHub/Classic/Gates/34_eshtb3' },
  { id: 114, name: 'Classic Plaza Gate', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','plaza'], pattern: 'gate-classic', image: 'v1783702100/SteelHub/Classic/Gates/34.1_rjsxu4' },
  { id: 115, name: 'Dynasty Gate', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','dynasty'], pattern: 'gate-classic', image: 'v1783702096/SteelHub/Classic/Gates/30_gkbiic' },
  { id: 116, name: 'Horse Gate', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','horse'], pattern: 'gate-classic', image: 'v1783701869/SteelHub/Classic/Gates/29_rq3le2' },
  { id: 117, name: 'Palace Thapa Gate', type: 'gates', style: 'classic', colors: ['black','gold', 'brown'], tags: ['gate','classic','thapa'], pattern: 'gate-classic', image: 'v1783701861/SteelHub/Classic/Gates/24_dhwgp6' },
  { id: 118, name: 'Golden Lion Gate', type: 'gates', style: 'classic', colors: ['gold','black'], tags: ['gate','classic','gold'], pattern: 'gate-classic', image: 'v1783701861/SteelHub/Classic/Gates/28_jixnik' },
  { id: 119, name: 'Heritage Drive Gate', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','drive'], pattern: 'gate-classic', image: 'v1783701855/SteelHub/Classic/Gates/27_t3n5ei' },
  { id: 120, name: 'Classic Thapa Gate', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','thapa'], pattern: 'gate-classic', image: 'v1783701853/SteelHub/Classic/Gates/26_gm3yn4' },
  { id: 121, name: 'Classic Thapa Grid', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','thapa'], pattern: 'gate-classic', image: 'v1783701853/SteelHub/Classic/Gates/25_rwosug' },
  { id: 122, name: 'Classic Thapa Wooden', type: 'gates', style: 'classic', colors: ['black','brown'], tags: ['gate','classic','thapa'], pattern: 'gate-classic', image: 'v1783701607/SteelHub/Classic/Gates/18_y2ogdk' },
  { id: 123, name: 'Classic Thapa Clover', type: 'gates', style: 'classic', colors: ['black','green'], tags: ['gate','classic','thapa'], pattern: 'gate-classic', image: 'v1783701604/SteelHub/Classic/Gates/23_yqszag' },
  { id: 124, name: 'Lattice Embosed ', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','arc'], pattern: 'gate-classic', image: 'v1783701604/SteelHub/Classic/Gates/20_serm3w' },
  { id: 125, name: 'Regal Box Gate', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','entry'], pattern: 'gate-classic', image: 'v1783701602/SteelHub/Classic/Gates/21_xtecva' },
  { id: 126, name: 'Classic Thapa Arc', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','thapa'], pattern: 'gate-classic', image: 'v1783701596/SteelHub/Classic/Gates/22_vahhly' },
  { id: 127, name: 'Regal Boxed Column Gate with Border', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','border'], pattern: 'gate-classic', image: 'v1783701589/SteelHub/Classic/Gates/14_xwpqtr' },
  { id: 140, name: 'Regal Boxed Column Gate', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','frame'], pattern: 'gate-classic', image: 'v1783701564/SteelHub/Classic/Gates/5_ziuxce' },
  { id: 142, name: 'Regal Boxed Gate with Gold Accents', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','heritage'], pattern: 'gate-classic', image: 'v1783701553/SteelHub/Classic/Gates/1_ccgqyy' },
  { id: 128, name: 'Thapa Square Gate', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','thapa'], pattern: 'gate-classic', image: 'v1783701589/SteelHub/Classic/Gates/13_wqwkrm' },
  { id: 129, name: 'Solid Arc Gate', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','palace'], pattern: 'gate-classic', image: 'v1783701589/SteelHub/Classic/Gates/15_hrnstx' },
  { id: 130, name: 'Sunflower Thapa Gate', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','thapa'], pattern: 'gate-classic', image: 'v1783701580/SteelHub/Classic/Gates/9_kfqsai' },
  { id: 131, name: 'Circle Thapa Gate', type: 'gates', style: 'classic', colors: ['black','brown'], tags: ['gate','classic','thapa'], pattern: 'gate-classic', image: 'v1783701579/SteelHub/Classic/Gates/10_o8ektz' },
  { id: 132, name: 'Estate Gate', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','estate'], pattern: 'gate-classic', image: 'v1783701569/SteelHub/Classic/Gates/8_bjeeuu' },
  { id: 133, name: 'Vajra Crowned', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','braided'], pattern: 'gate-classic', image: 'v1783701567/SteelHub/Classic/Gates/7_ds3isx' },
  { id: 134, name: 'Vajra Plain', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','decorative'], pattern: 'gate-classic', image: 'v1783701599/SteelHub/Classic/Gates/16_eb2fad' },
  { id: 135, name: 'Vajra Embelished', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','screen'], pattern: 'gate-classic', image: 'v1783701597/SteelHub/Classic/Gates/12_depjwr' },
  { id: 136, name: 'Vajra Rectangular', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','baroque'], pattern: 'gate-classic', image: 'v1783702240/SteelHub/Classic/Gates/62_xyzj2p' },
  { id: 137, name: 'Vajra Inverse Crowned', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','bronze'], pattern: 'gate-classic', image: 'v1783701567/SteelHub/Classic/Gates/6_y0kk9t' },
  { id: 138, name: 'Vajra Tiara', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','manor'], pattern: 'gate-classic', image: 'v1783702253/SteelHub/Classic/Gates/64_ujwatu' },
  { id: 139, name: 'Vajra Embelished Inverse', type: 'gates', style: 'classic', colors: ['bronze','black'], tags: ['gate','classic','arc'], pattern: 'gate-classic', image: 'v1783703035/SteelHub/Classic/Gates/11.1_jitywr' },
  { id: 141, name: 'Elegant Copper Gate', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','crest'], pattern: 'gate-classic', image: 'v1783701557/SteelHub/Classic/Gates/2_r8nbgg' },
  { id: 143, name: 'Classic Thapa Plain Arc', type: 'gates', style: 'classic', colors: ['black','bronze'], tags: ['gate','classic','thapa'], pattern: 'gate-classic', image: 'v1783701552/SteelHub/Classic/Gates/3_r9qw2r' },
  { id: 144, name: 'Checkered Plain Gate', type: 'gates', style: 'classic', colors: ['black','gold'], tags: ['gate','classic','rustic'], pattern: 'gate-classic', image: 'v1783703035/SteelHub/Classic/Gates/17.2_fcwj5z' },

  { id: 145, name: 'UV Railing', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783789908/SteelHub/Modern/Railings/1_muglni' },
  { id: 146, name: 'Double Stakes Railing', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783789908/SteelHub/Modern/Railings/2_irbayn' },
  { id: 147, name: 'Floating Box', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783789909/SteelHub/Modern/Railings/3_cdon3j' },
  { id: 148, name: 'Rounded ovals', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790053/SteelHub/Modern/Railings/4_cyb7dt' },
  { id: 149, name: 'Matchstick Railing', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790053/SteelHub/Modern/Railings/5_nttmyu' },
  { id: 150, name: 'Corndog Railing', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790054/SteelHub/Modern/Railings/6_blwksu' },
  { id: 151, name: 'Modern Maize', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790057/SteelHub/Modern/Railings/7_igwmjm' },
  { id: 152, name: 'Mixed Matchsticks', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790057/SteelHub/Modern/Railings/8_ipvnu3' },
  { id: 153, name: 'Rounded Boxed Railing', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790058/SteelHub/Modern/Railings/9_q9mgyg' },
  { id: 154, name: 'Mixed Rectangles Railing', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790078/SteelHub/Modern/Railings/10_ytk3t3' },
  { id: 155, name: 'Filled Rounded Ovals', type: 'railings', style: 'modern', colors: ['gold'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790104/SteelHub/Modern/Railings/11_uxglim' },
  { id: 156, name: 'Mix n Match', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790105/SteelHub/Modern/Railings/12_vgx8d4' },
  { id: 157, name: 'Mix Rounded Ovals', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790105/SteelHub/Modern/Railings/13_aiviru' },
  { id: 158, name: 'Volleyball Design', type: 'railings', style: 'modern', colors: ['black'], tags: ['curve', 'railing','modern'], pattern: 'rail-modern', image: 'v1783790108/SteelHub/Modern/Railings/14_bi2z09' },
  { id: 159, name: 'Perfect Rectangles', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790109/SteelHub/Modern/Railings/15_s6fhzg' },
  { id: 160, name: 'Floating Vertical Bars', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790111/SteelHub/Modern/Railings/16_d3xqnv' },
  { id: 161, name: 'Rectangular with Golden Accent', type: 'railings', style: 'modern', colors: ['black', 'gold'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790113/SteelHub/Modern/Railings/17_fyqmgw' },
  { id: 162, name: 'Incense Style Railing', type: 'railings', style: 'modern', colors: ['black', 'gold'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790116/SteelHub/Modern/Railings/18_qn53qh' },
  { id: 163, name: 'Eights', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern', 'circle', 'round'], pattern: 'rail-modern', image: 'v1783790118/SteelHub/Modern/Railings/19_lnilig' },
  { id: 164, name: 'Hanging Rectangles', type: 'railings', style: 'modern', colors: ['gold'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790122/SteelHub/Modern/Railings/21_jhaaqo' },
  { id: 165, name: 'Mix and Match Hanging Rectangles', type: 'railings', style: 'modern', colors: ['gold'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790123/SteelHub/Modern/Railings/22_ctmlal' },
  { id: 166, name: 'Floating Nested Rectangles', type: 'railings', style: 'modern', colors: ['black', 'gold'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790124/SteelHub/Modern/Railings/23_le0qpj' },
  { id: 167, name: 'Horizontal Wires', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790128/SteelHub/Modern/Railings/24_x9gv8n' },
  { id: 168, name: 'Horizontal Floating Thich Rectangle', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790129/SteelHub/Modern/Railings/25_wid9jm' },
  { id: 169, name: 'Grass Design', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790135/SteelHub/Modern/Railings/26_naecvh' },
  { id: 170, name: 'Golden Mesh design', type: 'railings', style: 'modern', colors: ['gold'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790136/SteelHub/Modern/Railings/27_azrtki' },
  { id: 171, name: 'Abstract Geometric Pattern', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790140/SteelHub/Modern/Railings/28_d0juyk' },
  { id: 172, name: 'Modern Thick Curves', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790141/SteelHub/Modern/Railings/29_dgrlgg' },
  { id: 173, name: 'Floating Mixed Rectangles', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790144/SteelHub/Modern/Railings/30_p43mvf' },
  { id: 174, name: 'Full Length Vertical Bars', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790148/SteelHub/Modern/Railings/31_o3a115' },
  { id: 175, name: 'Abstract Linear Design', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790149/SteelHub/Modern/Railings/32_uoggju' },
  { id: 176, name: 'Filled Rounded Oval', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790153/SteelHub/Modern/Railings/33_pvsm0l' },
  { id: 177, name: 'Plain Glass Design', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790154/SteelHub/Modern/Railings/34_wozp5j' },
  { id: 178, name: 'Horizontal Mix and Match', type: 'railings', style: 'modern', colors: ['black', 'silver'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790159/SteelHub/Modern/Railings/35_fmols2' },
  { id: 179, name: 'Modern Railing 36', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790160/SteelHub/Modern/Railings/36_of0xgk' },
  { id: 180, name: 'Modern Railing 37', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790165/SteelHub/Modern/Railings/37_igfgri' },
  { id: 181, name: 'Modern Railing 38', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790166/SteelHub/Modern/Railings/38_kkq3pk' },
  { id: 182, name: 'Modern Railing 39', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790169/SteelHub/Modern/Railings/39_mebtfl' },
  { id: 183, name: 'Modern Railing 40', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790176/SteelHub/Modern/Railings/40_rgp5c8' },
  { id: 184, name: 'Modern Railing 41', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790177/SteelHub/Modern/Railings/41_jcwp9g' },
  { id: 185, name: 'Modern Railing 42', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790183/SteelHub/Modern/Railings/42_rh5p57' },
  { id: 186, name: 'Modern Railing 42', type: 'railings', style: 'modern', colors: ['black'], tags: ['railing','modern'], pattern: 'rail-modern', image: 'v1783790119/SteelHub/Modern/Railings/20_ha7tbf' },

  { id: 187, name: 'Classic Railing 37', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789883/SteelHub/Classic/Railings/37_mzxayf' },
  { id: 188, name: 'Classic Railing 36', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789883/SteelHub/Classic/Railings/36_zxt4mn' },
  { id: 189, name: 'Classic Railing 33', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789883/SteelHub/Classic/Railings/33_eghchn' },
  { id: 190, name: 'Classic Railing 2', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789882/SteelHub/Classic/Railings/2_fkjoxg' },
  { id: 191, name: 'Classic Railing 27', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789882/SteelHub/Classic/Railings/27_cak6mt' },
  { id: 192, name: 'Classic Railing 20', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789882/SteelHub/Classic/Railings/20_txiyij' },
  { id: 193, name: 'Classic Railing 18', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789881/SteelHub/Classic/Railings/18_rgx9yz' },
  { id: 194, name: 'Classic Railing 12', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789880/SteelHub/Classic/Railings/12_bgdslr' },
  { id: 195, name: 'Classic Railing 11', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789878/SteelHub/Classic/Railings/11_qxa11h' },
  { id: 196, name: 'Classic Railing 10', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789877/SteelHub/Classic/Railings/10_thpqoh' },
  { id: 197, name: 'Classic Railing 8', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789876/SteelHub/Classic/Railings/8_wkft0y' },
  { id: 198, name: 'Classic Railing 9', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789876/SteelHub/Classic/Railings/9_snovhq' },
  { id: 199, name: 'Classic Railing 7', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789876/SteelHub/Classic/Railings/7_jie8xa' },
  { id: 200, name: 'Classic Railing 4', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789876/SteelHub/Classic/Railings/4_hpogxw' },
  { id: 201, name: 'Classic Railing 1', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789875/SteelHub/Classic/Railings/1_qgwnhg' },
  { id: 202, name: 'Classic Railing 6', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789875/SteelHub/Classic/Railings/6_hpme0e' },
  { id: 203, name: 'Classic Railing 5', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789875/SteelHub/Classic/Railings/5_ebsrl1' },
  { id: 204, name: 'Classic Railing 3', type: 'railings', style: 'classic', colors: ['black','bronze'], tags: ['railing','classic'], pattern: 'rail-classic', image: 'v1783789875/SteelHub/Classic/Railings/3_u2occu' },

  /** Staircases */
  { id: 205, name: 'Staircase 1', type: 'staircases', styles: ['modern','classic'], colors: ['black','bronze'], tags: ['staircase','spiral'], pattern: 'stair-classic', image: 'v1784305912/SteelHub/staircase/12_rwdm1a' },
  { id: 206, name: 'Staircase 2', type: 'staircases', styles: ['modern','classic'], colors: ['black','bronze'], tags: ['staircase','spiral'], pattern: 'stair-classic', image: 'v1784305911/SteelHub/staircase/6_po5aou' },
  { id: 207, name: 'Staircase 3', type: 'staircases', styles: ['modern','classic'], colors: ['black','bronze'], tags: ['staircase','spiral'], pattern: 'stair-classic', image: 'v1784305911/SteelHub/staircase/11_fceamj' },
  { id: 208, name: 'Staircase 4', type: 'staircases', styles: ['modern','classic'], colors: ['black','bronze'], tags: ['staircase','straight'], pattern: 'stair-classic', image: 'v1784305911/SteelHub/staircase/7_m1e5cz' },
  { id: 209, name: 'Staircase 5', type: 'staircases', styles: ['modern','classic'], colors: ['black','bronze'], tags: ['staircase','spiral'], pattern: 'stair-classic', image: 'v1784305911/SteelHub/staircase/10_pynwoy' },
  { id: 210, name: 'Staircase 6', type: 'staircases', styles: ['modern','classic'], colors: ['black','bronze'], tags: ['staircase','spiral'], pattern: 'stair-classic', image: 'v1784305911/SteelHub/staircase/5_qqvvgg' },
  { id: 211, name: 'Staircase 7', type: 'staircases', styles: ['modern','classic'], colors: ['black','bronze'], tags: ['staircase','straight'], pattern: 'stair-classic', image: 'v1784305910/SteelHub/staircase/2_zzrnpw' },
  { id: 212, name: 'Staircase 8', type: 'staircases', styles: ['modern','classic'], colors: ['black','bronze'], tags: ['staircase','spiral'], pattern: 'stair-classic', image: 'v1784305910/SteelHub/staircase/3_cogyzn' },
  { id: 213, name: 'Staircase 9', type: 'staircases', styles: ['modern','classic'], colors: ['black','bronze'], tags: ['staircase','straight'], pattern: 'stair-classic', image: 'v1784305910/SteelHub/staircase/1_b2bgfv' },
  { id: 214, name: 'Staircase 10', type: 'staircases', styles: ['modern','classic'], colors: ['black','bronze'], tags: ['staircase','spiral'], pattern: 'stair-classic', image: 'v1784305910/SteelHub/staircase/9_ea8qdt' },
  { id: 215, name: 'Staircase 11', type: 'staircases', styles: ['modern','classic'], colors: ['black','bronze'], tags: ['staircase','spiral'], pattern: 'stair-classic', image: 'v1784305910/SteelHub/staircase/8_jdyejx' },
  { id: 216, name: 'Staircase 12', type: 'staircases', styles: ['modern','classic'], colors: ['black','bronze'], tags: ['staircase','spiral'], pattern: 'stair-classic', image: 'v1784305910/SteelHub/staircase/4_zykdsn' },

  { id: 12, name: 'Natural Stone Facade Cladding', type: 'facades', style: 'classic', colors: ['bronze','white'], tags: ['facade','stone','cladding','elevation'], pattern: 'facade-classic', image: PLACEHOLDER_IMAGE },
  { id: 13, name: 'HPL Panel Facade', type: 'facades', style: 'modern', colors: ['black','silver'], tags: ['facade','hpl','cladding','elevation'], pattern: 'facade-modern', image: PLACEHOLDER_IMAGE },
  { id: 14, name: 'UPVC Louver Screen Facade', type: 'facades', style: 'modern', colors: ['white','silver'], tags: ['facade','upvc','louver','elevation'], pattern: 'facade-modern', image: PLACEHOLDER_IMAGE },
  { id: 15, name: 'Textured Stone Entrance Wall', type: 'facades', style: 'classic', colors: ['bronze'], tags: ['facade','stone','entrance','elevation'], pattern: 'facade-classic', image: PLACEHOLDER_IMAGE },

  { id: 16, name: 'Car Parking Shed', type: 'sheds', style: 'modern', colors: ['black','silver'], tags: ['shed','canopy','parking','car shed'], pattern: 'shed-modern', image: PLACEHOLDER_IMAGE },
  { id: 17, name: 'Polycarbonate Courtyard Canopy', type: 'sheds', style: 'modern', colors: ['silver','white'], tags: ['shed','canopy','courtyard'], pattern: 'shed-modern', image: PLACEHOLDER_IMAGE },
  { id: 18, name: 'Classic Tin Roof Shed', type: 'sheds', style: 'classic', colors: ['black','bronze'], tags: ['shed','roof'], pattern: 'shed-classic', image: PLACEHOLDER_IMAGE },
  
  { id: 19, name: 'The Wave', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','slat'], pattern: 'gate-modern', image: 'v1783609333/SteelHub/Modern/Gates/9_xnax3k', images: ['v1783609333/SteelHub/Modern/Gates/9_xnax3k'] },
  { id: 20, name: 'Star CNC', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','privacy'], pattern: 'gate-modern', image: 'v1783609331/SteelHub/Modern/Gates/8_hcjw54', images: ['v1783609331/SteelHub/Modern/Gates/8_hcjw54'] },
  { id: 21, name: 'Wavy Class', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','metal'], pattern: 'gate-modern', image: 'v1783609310/SteelHub/Modern/Gates/7p_ji6zey', images: ['v1783609310/SteelHub/Modern/Gates/7p_ji6zey'] },
  { id: 22, name: 'Horizontal Profile', type: 'gates', style: 'modern', colors: ['copper', 'bronze'], tags: ['gate','modern','minimal'], pattern: 'gate-modern', image: 'v1783609286/SteelHub/Modern/Gates/6_mr6sxs', images: ['v1783609286/SteelHub/Modern/Gates/6_mr6sxs'] },
  { id: 24, name: 'Dotted Design', type: 'gates', style: 'modern', colors: ['black', 'silver'], tags: ['gate','modern','slim'], pattern: 'gate-modern', image: 'v1783609282/SteelHub/Modern/Gates/59_cpifaw', images: ['v1783609282/SteelHub/Modern/Gates/59_cpifaw'] },
  { id: 25, name: 'Floral Gate', type: 'gates', style: 'modern', colors: ['copper'], tags: ['gate','modern','frame'], pattern: 'gate-modern', image: 'v1783609281/SteelHub/Modern/Gates/58_wx3rnh', images: ['v1783609281/SteelHub/Modern/Gates/58_wx3rnh'] },
  { id: 26, name: 'Geometric CNC with Golden Accents', type: 'gates', style: 'modern', colors: ['copper'], tags: ['gate','modern','ornate'], pattern: 'gate-modern', image: 'v1783609281/SteelHub/Modern/Gates/57_lrdgt5', images: ['v1783609281/SteelHub/Modern/Gates/57_lrdgt5'] },
  { id: 27, name: 'CNC V', type: 'gates', style: 'modern', colors: ['copper'], tags: ['gate','modern','panel'], pattern: 'gate-modern', image: 'v1783609281/SteelHub/Modern/Gates/56_muxnig', images: ['v1783609281/SteelHub/Modern/Gates/56_muxnig'] },
  { id: 28, name: 'Spiral Black', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','driveway'], pattern: 'gate-modern', image: 'v1783609287/SteelHub/Modern/Gates/55_xsuhor', images: ['v1783609287/SteelHub/Modern/Gates/55_xsuhor'] },
  { id: 29, name: 'Frameless Profile', type: 'gates', style: 'modern', colors: ['black', 'silver'], tags: ['gate','modern','architectural'], pattern: 'gate-modern', image: 'v1783609329/SteelHub/Modern/Gates/54_iu2dq8', images: ['v1783609329/SteelHub/Modern/Gates/54_iu2dq8'] },
  { id: 30, name: 'Copper Glaze', type: 'gates', style: 'modern', colors: ['black', 'copper'], tags: ['gate','modern','linear'], pattern: 'gate-modern', image: 'v1783609327/SteelHub/Modern/Gates/53_urb7c4', images: ['v1783609327/SteelHub/Modern/Gates/53_urb7c4'] },
  { id: 31, name: 'Geometric squares', type: 'gates', style: 'modern', colors: ['black', 'grey'], tags: ['gate','modern','elegant'], pattern: 'gate-modern', image: 'v1783609308/SteelHub/Modern/Gates/52_xiv3iw', images: ['v1783609308/SteelHub/Modern/Gates/52_xiv3iw'] },
  { id: 32, name: 'Asymmetric Profile Gate', type: 'gates', style: 'modern', colors: ['black', 'grey'], tags: ['gate','modern','luxury'], pattern: 'gate-modern', image: 'v1783609318/SteelHub/Modern/Gates/51_zxfogf', images: ['v1783609318/SteelHub/Modern/Gates/51_zxfogf'] },
  { id: 33, name: 'Sliding Asymmetric Profile Gate', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','industrial'], pattern: 'gate-modern', image: 'v1783609322/SteelHub/Modern/Gates/51.1_x0t9yz', images: ['v1783609322/SteelHub/Modern/Gates/51.1_x0t9yz'] },
  { id: 34, name: 'ACP Wooden block style', type: 'gates', style: 'modern', colors: ['black', 'brown'], tags: ['gate','modern','clean'], pattern: 'gate-modern', image: 'v1783609303/SteelHub/Modern/Gates/50_krdgls', images: ['v1783609303/SteelHub/Modern/Gates/50_krdgls'] },
  { id: 35, name: 'Golden Border Profile Gate', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','premium'], pattern: 'gate-modern', image: 'v1783609316/SteelHub/Modern/Gates/5.1_svktig', images: ['v1783609316/SteelHub/Modern/Gates/5.1_svktig'] },
  { id: 36, name: 'Wooden Block Panels', type: 'gates', style: 'modern', colors: ['black', 'brown'], tags: ['gate','modern','bold'], pattern: 'gate-modern', image: 'v1783609305/SteelHub/Modern/Gates/4_xsleqr', images: ['v1783609305/SteelHub/Modern/Gates/4_xsleqr'] },
  { id: 37, name: 'Double profile gate', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','statement'], pattern: 'gate-modern', image: 'v1783609307/SteelHub/Modern/Gates/49_vpop6o', images: ['v1783609307/SteelHub/Modern/Gates/49_vpop6o'] },
  { id: 38, name: 'Wooden blocks with Gold Accent', type: 'gates', style: 'modern', colors: ['black', 'brown'], tags: ['gate','modern','mesh'], pattern: 'gate-modern', image: 'v1783609316/SteelHub/Modern/Gates/48_mwqxhw', images: ['v1783609316/SteelHub/Modern/Gates/48_mwqxhw'] },
  { id: 39, name: 'Zig Zag Golden Accents', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','powdercoat'], pattern: 'gate-modern', image: 'v1783609303/SteelHub/Modern/Gates/47_ejq1il', images: ['v1783609303/SteelHub/Modern/Gates/47_ejq1il'] },
  { id: 40, name: 'Wooden Ply Style', type: 'gates', style: 'modern', colors: ['black', 'brown'], tags: ['gate','modern','sleek'], pattern: 'gate-modern', image: 'v1783609297/SteelHub/Modern/Gates/46_kgqwzh', images: ['v1783609297/SteelHub/Modern/Gates/46_kgqwzh'] },
  { id: 41, name: 'Single Profile with Horizontal Ply', type: 'gates', style: 'modern', colors: ['brown'], tags: ['gate','modern','solid'], pattern: 'gate-modern', image: 'v1783609289/SteelHub/Modern/Gates/45_aa89jn', images: ['v1783609289/SteelHub/Modern/Gates/45_aa89jn'] },
  { id: 42, name: 'Vertical Profile Wooden HPL Gate', type: 'gates', style: 'modern', colors: ['black', 'brown'], tags: ['gate','modern','curved'], pattern: 'gate-modern', image: 'v1783609294/SteelHub/Modern/Gates/44_euwnf2', images: ['v1783609294/SteelHub/Modern/Gates/44_euwnf2'] },
  { id: 43, name: 'Aluminium and Wooden HPL Gate', type: 'gates', style: 'modern', colors: ['black', 'brown'], tags: ['gate','modern','futuristic'], pattern: 'gate-modern', image: 'v1783609293/SteelHub/Modern/Gates/43_w7fgwp', images: ['v1783609293/SteelHub/Modern/Gates/43_w7fgwp'] },
  { id: 44, name: 'Wooden Framed Gate', type: 'gates', style: 'modern', colors: ['black', 'brown', 'silver'], tags: ['gate','modern','perimeter'], pattern: 'gate-modern', image: 'v1783609295/SteelHub/Modern/Gates/42_hcepht', images: ['v1783609295/SteelHub/Modern/Gates/42_hcepht'] },
  { id: 45, name: 'Aluminium Combed Gate', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','timeless'], pattern: 'gate-modern', image: 'v1783609289/SteelHub/Modern/Gates/41_puh8sq', images: ['v1783609289/SteelHub/Modern/Gates/41_puh8sq'] },
  { id: 46, name: 'Geometric CNC with Golden Accents', type: 'gates', style: 'modern', colors: ['black', 'gold'], tags: ['gate','modern','decorative'], pattern: 'gate-modern', image: 'v1783609292/SteelHub/Modern/Gates/40_juczty', images: ['v1783609292/SteelHub/Modern/Gates/40_juczty'] },
  { id: 47, name: 'Checkered Gate', type: 'gates', style: 'modern', colors: ['black', 'brown'], tags: ['gate','modern','monolithic'], pattern: 'gate-modern', image: 'v1783609329/SteelHub/Modern/Gates/3_bupygo', images: ['v1783609329/SteelHub/Modern/Gates/3_bupygo'] },
  { id: 48, name: 'Vertical Alternate Wooden Panel', type: 'gates', style: 'modern', colors: ['black', 'brown'], tags: ['gate','modern','chic'], pattern: 'gate-modern', image: 'v1783609297/SteelHub/Modern/Gates/39_x8swf0', images: ['v1783609297/SteelHub/Modern/Gates/39_x8swf0'] },
  { id: 49, name: 'Luxe', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','feature'], pattern: 'gate-modern', image: 'v1783609317/SteelHub/Modern/Gates/37_ug0nrx', images: ['v1783609317/SteelHub/Modern/Gates/37_ug0nrx'] },
  { id: 50, name: 'Inverted U Wooden Gate', type: 'gates', style: 'modern', colors: ['black', 'brown'], tags: ['gate','modern','contrast'], pattern: 'gate-modern', image: 'v1783609313/SteelHub/Modern/Gates/36_td83pd', images: ['v1783609313/SteelHub/Modern/Gates/36_td83pd'] },
  { id: 51, name: 'Triangular Comb Design', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','sharp'], pattern: 'gate-modern', image: 'v1783609314/SteelHub/Modern/Gates/36_hrzrwb', images: ['v1783609314/SteelHub/Modern/Gates/36_hrzrwb'] },
  { id: 52, name: 'Dotted Profile Gate with Golden Accents', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','inviting'], pattern: 'gate-modern', image: 'v1783609320/SteelHub/Modern/Gates/35_pcz9ib', images: ['v1783609320/SteelHub/Modern/Gates/35_pcz9ib'] },
  { id: 53, name: 'Wooden Design with Degi Accents', type: 'gates', style: 'modern', colors: ['black', 'brown'], tags: ['gate','modern','residential'], pattern: 'gate-modern', image: 'v1783609309/SteelHub/Modern/Gates/34_lz8oql', images: ['v1783609309/SteelHub/Modern/Gates/34_lz8oql'] },
  { id: 54, name: 'Comb with Copper Accent', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','spacious'], pattern: 'gate-modern', image: 'v1783609287/SteelHub/Modern/Gates/31_u9ip0r', images: ['v1783609287/SteelHub/Modern/Gates/31_u9ip0r'] },
  { id: 55, name: 'Rubics Cube Design', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','custom'], pattern: 'gate-modern', image: 'v1783609305/SteelHub/Modern/Gates/30_cfhexr', images: ['v1783609305/SteelHub/Modern/Gates/30_cfhexr'] },
  { id: 56, name: 'Aura', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','refined'], pattern: 'gate-modern', image: 'v1783609282/SteelHub/Modern/Gates/2_lufpg5', images: ['v1783609282/SteelHub/Modern/Gates/2_lufpg5'] },
  { id: 57, name: 'Concentric Rectangles', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','premium'], pattern: 'gate-modern', image: 'v1783609337/SteelHub/Modern/Gates/29_w5fo1g', images: ['v1783609337/SteelHub/Modern/Gates/29_w5fo1g'] },
  { id: 58, name: 'Golden Rule', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','luxury'], pattern: 'gate-modern', image: 'v1783609295/SteelHub/Modern/Gates/28_wznthg', images: ['v1783609295/SteelHub/Modern/Gates/28_wznthg'] },
  { id: 59, name: 'Vertical Slotted Wooden Panels', type: 'gates', style: 'modern', colors: ['black', 'brown'], tags: ['gate','modern','minimal'], pattern: 'gate-modern', image: 'v1783609283/SteelHub/Modern/Gates/27_aceowv', images: ['v1783609283/SteelHub/Modern/Gates/27_aceowv'] },
  { id: 60, name: 'Spider Web', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','statement'], pattern: 'gate-modern', image: 'v1783609347/SteelHub/Modern/Gates/26_x5wvxf', images: ['v1783609347/SteelHub/Modern/Gates/26_x5wvxf'] },
  { id: 61, name: 'Half n Half', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','sleek'], pattern: 'gate-modern', image: 'v1783609337/SteelHub/Modern/Gates/25_frw74f', images: ['v1783609337/SteelHub/Modern/Gates/25_frw74f'] },
  { id: 62, name: 'Mosaic', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','modern'], pattern: 'gate-modern', image: 'v1783609322/SteelHub/Modern/Gates/24_nuutun', images: ['v1783609322/SteelHub/Modern/Gates/24_nuutun'] },
  { id: 63, name: 'Accentuated Butterfly', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','metal'], pattern: 'gate-modern', image: 'v1783609315/SteelHub/Modern/Gates/23_upx9ki', images: ['v1783609315/SteelHub/Modern/Gates/23_upx9ki'] },
  { id: 64, name: 'CNC Forest', type: 'gates', style: 'modern', colors: ['bronze'], tags: ['gate','modern','slim'], pattern: 'gate-modern', image: 'v1783609325/SteelHub/Modern/Gates/22_gl6yc4', images: ['v1783609325/SteelHub/Modern/Gates/22_gl6yc4'] },
  { id: 65, name: 'Castle Style Comb', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','elegant'], pattern: 'gate-modern', image: 'v1783609323/SteelHub/Modern/Gates/21_sjzcsu', images: ['v1783609323/SteelHub/Modern/Gates/21_sjzcsu'] },
  { id: 66, name: 'Perforated Comb with Degi', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','frame'], pattern: 'gate-modern', image: 'v1783609347/SteelHub/Modern/Gates/20_ne9u1u', images: ['v1783609347/SteelHub/Modern/Gates/20_ne9u1u'] },
  { id: 67, name: 'Golden Square', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','driveway'], pattern: 'gate-modern', image: 'v1783669109/SteelHub/Modern/Gates/1_i6iu71', images: ['v1783669109/SteelHub/Modern/Gates/1_i6iu71'] },
  { id: 68, name: 'Split Thapa Door', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','architectural'], pattern: 'gate-modern', image: 'v1783609291/SteelHub/Modern/Gates/19_imv5z7', images: ['v1783609291/SteelHub/Modern/Gates/19_imv5z7'] },
  { id: 69, name: 'Embossed Thapa Door', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','linear'], pattern: 'gate-modern', image: 'v1783609290/SteelHub/Modern/Gates/18_ppgm6l', images: ['v1783609290/SteelHub/Modern/Gates/18_ppgm6l'] },
  { id: 70, name: 'Horizontal Slotted Wooden Gate', type: 'gates', style: 'modern', colors: ['black', 'brown'], tags: ['gate','modern','clean'], pattern: 'gate-modern', image: 'v1783609333/SteelHub/Modern/Gates/17_wnxjjw', images: ['v1783609333/SteelHub/Modern/Gates/17_wnxjjw'] },
  { id: 71, name: 'Vertical Golden Accents', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','bold'], pattern: 'gate-modern', image: 'v1783609312/SteelHub/Modern/Gates/16_febs3i', images: ['v1783609312/SteelHub/Modern/Gates/16_febs3i'] },
  { id: 72, name: 'See Through Alternate Wooden Panels', type: 'gates', style: 'modern', colors: ['black', 'brown'], tags: ['gate','modern','feature'], pattern: 'gate-modern', image: 'v1783609320/SteelHub/Modern/Gates/15_za6uxz', images: ['v1783609320/SteelHub/Modern/Gates/15_za6uxz'] },
  { id: 73, name: 'Elongated Framed Gate', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','mesh'], pattern: 'gate-modern', image: 'v1783609311/SteelHub/Modern/Gates/14_qslzlr', images: ['v1783609311/SteelHub/Modern/Gates/14_qslzlr'] },
  { id: 74, name: 'CNC Paisley', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','powdercoat'], pattern: 'gate-modern', image: 'v1783609287/SteelHub/Modern/Gates/13_hvyiw7', images: ['v1783609287/SteelHub/Modern/Gates/13_hvyiw7'] },
  { id: 75, name: 'The Wave', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','sleek'], pattern: 'gate-modern', image: 'v1783609333/SteelHub/Modern/Gates/12_czpih5', images: ['v1783609333/SteelHub/Modern/Gates/12_czpih5'] },
  { id: 76, name: 'Combed with Copper Accents', type: 'gates', style: 'modern', colors: ['black'], tags: ['gate','modern','statement'], pattern: 'gate-modern', image: 'v1783669156/SteelHub/Modern/Gates/10_jr6l8r', images: ['v1783669156/SteelHub/Modern/Gates/10_jr6l8r'] },
];

const COLOR_HEX = {
  black: '#1a1a1a',
  gold: '#d8b23a',
  bronze: '#8a6a3c',
  silver: '#b7bcbe',
  white: '#f4f4f2',
  grey: '#8a8d90',
  gray: '#8a8d90',
  brown: '#8b5a2b',
  copper: '#b87333',
};

function getColorHex(color){
  const key = String(color || '').trim().toLowerCase();
  if(!key) return '#cccccc';
  return COLOR_HEX[key === 'gray' ? 'grey' : key] || '#cccccc';
}

const TYPE_LABELS = {
  gates: 'Gates',
  railings: 'Railings',
  staircases: 'Staircases',
  facades: 'Facades',
  sheds: 'Sheds & Canopies',
};
