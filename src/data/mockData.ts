import { Product, Artisan, JournalArticle } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Terracotta Amphora Vase',
    category: 'pottery',
    categoryLabel: 'Pottery & Ceramics',
    badge: 'Handmade Ceramic',
    priceUSD: 128,
    priceINR: 10500,
    artisanId: 'artisan-meera',
    artisanName: 'Meera Sharma',
    artisanLocation: 'Jaipur, IN',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBllvw_wK1kY3SIT0N968dBottEj9hBfGIBuq9FaBrp2f87enzfOpm-ak5jmrj3h8gdOQZc44iTq3jDfogPyHGSItDN-ydrddy6wN-9ZYtO0_BTvtSE0icxvIAxnGP9qmo4jkpWfYlqTAERnmixk5b9dwrLW1wUELQLSc_TkIKiI5R7CmRTx2pEA0z3zcC3Vk0Tr4ocbOAaOR5Hbghw-C3Xl1PvTQDaxsDyjASe77gcPQPtaGF1CcT9w',
    rating: 4.9,
    reviewCount: 42,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbF-iVkeLaithc8XoNDQG924BFZBWQB_fNqZbYjpa016qg9-8DRJ9yDri0qiXy5fWQ97sY2gwFrGY0DS339bm5TAqoIyLCdxy8KRG_RqzpgMam67SNYEdVmJXOPtjReH1-QUVUsFeXwEY5Y7Yq_l27rnlqPLRUV9nWYAjEXVJp7logh-mQSgrfLm_U9NQEZp35L6-yonZYtr1oagP1GT3BgK6WM0W2pWl2I8lSYyE_izBN8qGfCNNLeQ',
    altText: 'Hand-thrown terracotta amphora vase with organic irregular textured surface and earth pigment wash',
    stock: 7,
    leadTime: 'Ready to ship',
    materials: ['River Clay', 'Natural Ochre Wash', 'Wood-fired'],
    dimensions: '32cm H × 22cm Dia · 2.4 kg',
    provenanceDetails: {
      technique: 'Kick-wheel shaping with pit firing technique',
      firingTemp: '980°C wood kiln',
      heritageAge: '14th-century Rajasthani tradition',
      fairWagePercentage: 88,
      hoursToCraft: 14,
    },
    story: 'Thrown by hand on a balanced wooden wheel in Meera’s studio in Sanganer, Jaipur. The natural clay was harvested from dried monsoon riverbeds and seasoned for three lunar cycles before being shaped.'
  },
  {
    id: 'prod-2',
    title: 'Indigo Ikat Silk Cushion Cover',
    category: 'textiles',
    categoryLabel: 'Textiles & Weaving',
    badge: 'Natural Dye',
    priceUSD: 64,
    priceINR: 5200,
    artisanId: 'artisan-someshwar',
    artisanName: 'Radhika & Somesh',
    artisanLocation: 'Pochampally, IN',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBorwRKZf5ir-ck1JGL8laWostmVj8cGqZG-QlgdAX5UzL9WaSWWm-Zgsj8g6egthrxxRbdvxMcCqm08apHWcaR4x_lSVf29J9fOL3I10IYZyKY-mxjAJ_XCWVBS9KoGrh-ZFmNBSgvk7nLcY_Bjxujjk-5O6sN_Lc-kUnQGjSNNusLdDOuZsDCrAi-Cc_2LGVs11HSBIj74xZiQJu0rl9TCL6pY96-4yWWgLRV1wqKp2uFmXv75TN03g',
    rating: 5.0,
    reviewCount: 68,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2dA33qAB6XNiv_xda5pNRi68QyJXSJrFzP4vdOa0zGCN5PMGU1MTxyhPvav327Y947crK-pgfFflcuI5fluueg37Ia5puEqBBi66vQaiziW4vRFyZDtCvL5JGC2p3H0TQphE15mxP4rnOJDY7VfECFggkaWfkp2rxK46C_RF4Cqnn5JOuNU7vUfcDZdriDmN2KH8VVBe2bNg95fxtoDjbXUm92s_BCsyLT0IYy3jpp1xPPjJhs4mo1Q',
    altText: 'Indigo handwoven ikat silk cushion cover featuring bold geometric diamond motifs, textured raw natural silk threads',
    stock: 12,
    leadTime: 'Ready to ship',
    materials: ['Mulberry Silk', 'Fermented Natural Indigo', 'Organic Cotton Backing'],
    dimensions: '45cm × 45cm',
    provenanceDetails: {
      technique: 'Double Ikat resist tie-dye on wooden pit loom',
      heritageAge: '5 generations of Pochampally lineage',
      fairWagePercentage: 91,
      hoursToCraft: 18.5,
    },
    story: 'Woven using the intricate Pochampally Ikat resist-dye method where the patterns are calculated in verse and tied on silk warp threads before entering the vat of 20-day fermented indigo.'
  },
  {
    id: 'prod-3',
    title: 'Brass Lotus Diya Lamp',
    category: 'metalwork',
    categoryLabel: 'Metalwork & Brass',
    badge: 'Solid Brass',
    priceUSD: 85,
    priceINR: 6900,
    artisanId: 'artisan-harish',
    artisanName: 'Master Harish',
    artisanLocation: 'Moradabad, IN',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUsCamA3_ifChkkfFkjGJjKhtaz0amDvAjer4ATDHngucXClYNXt1VQ09b7Jy6QbZctDkIqy_SPVRWiXIIGBe-iv_zKp2lFQNlRyxI8BeIw4_jiSY1G8_2jzLN1juWnCaLGfS3XFYEM3auF4riqljCN0Wr8ZFJMnDO9EwszpascgB25QMRvUbLjYt3FPxDlv3_DOEh2d-EPsrma2bAuRBrxHZDobtoz2yHOE-KJbCGxmfhpHKOjGfBOg',
    rating: 4.9,
    reviewCount: 31,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjL9gBVFFjnXpr8P7OeKeKYqPH3n5DzXBq_juHu-fZniPmGr5-AXZruh2Y86X61RWgtguIiVeNGKMvONsL9NBMOPSY4LFyTxM55pDAcuDq6tn9DCekzUybszOx9l-PrN09N5eN9kQeN1EwguBDaewQZW5GeuhzzYLwKpTK-cctqSem1MnRJxNuUT_niUDJho9RExDfJDJdzf3w8hEZreUE4d8jkb0UIxn-bLWXdslYH1hy2JjalWKp7w',
    altText: 'Traditional heavy hand-chiseled brass lotus diya oil lamp with delicate scalloped petals',
    stock: 5,
    leadTime: 'Ready to ship',
    materials: ['Virgin Bell Metal', 'Sand-cast Brass', 'Hand Chiseling'],
    dimensions: '18cm Dia × 14cm H · 1.8 kg',
    provenanceDetails: {
      technique: 'Lost-wax sand casting with relief floral chisel work',
      heritageAge: '4th generation Moradabad metalsmith guild',
      fairWagePercentage: 86,
      hoursToCraft: 16,
    },
    story: 'Forged from bell-metal brass in the artisan alleyways of Moradabad. Each petal of the lotus is hand-beaten with tempered iron chisels to capture and radiate the flame’s glow.'
  },
  {
    id: 'prod-4',
    title: 'Blue Pottery Floral Platter',
    category: 'pottery',
    categoryLabel: 'Pottery & Ceramics',
    badge: 'Quartz Glaze',
    priceUSD: 94,
    priceINR: 7800,
    artisanId: 'artisan-kripal',
    artisanName: 'Kripal Kumbh Studio',
    artisanLocation: 'Jaipur, IN',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLqxEU5ohR4kNy3XiwZFguU4MigJnbuxMmS5qFRO6JzLNauSrdfD2kq87qr-FMnfAccp9YAillTKoAwm4PnIR7tvwpiI_t_rQFyL46TT46ewdii8DNNakezWB-Si_3SjzyPIc5BaS-nsQTX5opYtW7fHsfSG_RpWTNPRYbwQSOqfV9AQSQf3JVF8VcdZxZGyU6jurXffD_-_zbmPUthpjIQDXirul7OC-36Ngamc8Isba3wSiRCMFw5w',
    rating: 4.8,
    reviewCount: 55,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChmW1IFD2pB_GQ-4jKS3G4l6IxKE52pf-MxfINa9BSP6bQ5CM4FeYTVHjPOOEGv4anU-JVhAXxuZtDBswkDIYpg0gRZJrVPbQByxwpk-EV2QVOpC-DJKGiOcCLRP2LpWhprkGr38BSLjmYpqFAvhw3y7NcmuAAcXIX_c4t7kXSzv5B4b8WzneM7Nh1p4LNawI4EJLBNPVBp5Esldq-DSWTYDf2r92NlU1NHqiaItFH5XClXwpJsDIcVQ',
    altText: 'Traditional Jaipur blue pottery decorative serving platter with intricate cobalt and turquoise Persian floral patterns',
    stock: 9,
    leadTime: 'Ready to ship',
    materials: ['Ground Quartz', 'Fuller’s Earth', 'Cobalt Oxide Pigment'],
    dimensions: '30cm Dia · 1.1 kg',
    provenanceDetails: {
      technique: 'Non-clay Egyptian quartz paste with brush glaze',
      firingTemp: '850°C charcoal muffle kiln',
      heritageAge: 'Mughal-Persian imperial glaze lineage',
      fairWagePercentage: 89,
      hoursToCraft: 12,
    },
    story: 'Crafted entirely without conventional clay. The dough is formulated using powdered quartz, katira gum, and multani mitti, then hand-painted with squirrel-hair brushes dipped in cobalt oxide.'
  },
  {
    id: 'prod-5',
    title: 'Carved Teak Keepsake Box',
    category: 'woodcraft',
    categoryLabel: 'Woodcraft & Carving',
    badge: 'Hand-Chiseled',
    priceUSD: 110,
    priceINR: 9100,
    artisanId: 'artisan-kadek',
    artisanName: 'Kadek Wijaya',
    artisanLocation: 'Ubud, Bali',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHcrWxVSM3SgTaZnNxjeeG_PxAlTLyJBrxG7SUlWcN4NI3GS9M4EkNlTenIIlK9rE4SzplxTGCoN2Vq5INZxu5EybWyHqwsLbmGYCtdM-9yh9qgwvlUDi3KYT5BxEDlHCsjFz9dvCiRbN2_9j9DD5AnPvv4ReoFwM4Wf9qqz9vNXOwjNB06lbL9rqChRT8NGo8ctVewByrc4BKl3WIcDJc2eInceyHNkIuscQGS6r_ng0N7POsIWe8zw',
    rating: 5.0,
    reviewCount: 27,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXO5l0JGsM8dbIyyLewkc_HiX6TRMvzoKA6e4idPCDp7-Tqxqj9K1OOn4N04j5xUeK--_p0J3wn1DrJMZgtJupRZlBykY1ivtQs1MhmqZEcjg2EOMxxfCMHMUruoYEnkRRTe79FDc75thDeLeIH3qqpTVgV9DE02sforZ9HPOeDLPNQMRecZZuxaduxn9_sBfhOw7UteR4xhR16xb-8pwUbaPf2jhtUXvmAu1sdTSrC9J-rky06iwzNA',
    altText: 'Hand-carved reclaimed teak keepsake box with delicate Balinese floral relief motifs, natural beeswax finish',
    stock: 4,
    leadTime: 'Ready to ship',
    materials: ['Reclaimed Old Teak Wood', 'Organic Coconut Oil & Beeswax'],
    dimensions: '26cm W × 18cm D × 11cm H',
    provenanceDetails: {
      technique: 'Deep relief gouge carving without nails',
      heritageAge: 'Ubud royal woodcarver guild',
      fairWagePercentage: 92,
      hoursToCraft: 21,
    },
    story: 'Carved from reclaimed Indonesian teak salvaged from historic architectural beams. Kadek spent four days executing the botanical frangipani reliefs with over twelve different hand gouges.'
  },
  {
    id: 'prod-6',
    title: 'Block-Printed Mulberry Stole',
    category: 'textiles',
    categoryLabel: 'Textiles & Weaving',
    badge: 'Dabu Mud Resist',
    priceUSD: 78,
    priceINR: 6400,
    artisanId: 'artisan-anwar',
    artisanName: 'Anwar Hussain',
    artisanLocation: 'Bagru, IN',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjz41D5ym0skuW6Iv93ZKAOfHjsbnhnpsoPSFN4Spiei-BFS-g5qEXo0wokfUCubL1MX6uri21O6MDPDU34QvstDjEKrLvILh2Jkw9usG7nMZjQbgokiEcT6dl0zlh0juuF9C2nisSDZqSlvNt5SmhC0hYhtilbvUKx9MpRO1g9nVaeVn4JiHO9bjbh2h9CPcy_UrP8O5XNzRIA5ouZSvkVRsq1cDRN4jQF8RsETWrSPP4m9iRCH26lA',
    rating: 4.9,
    reviewCount: 84,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn0-bAqCi9V8IcABF2TBddWxkNBLSjS25J2GyTivH6oE5YCvAUX3clDQHxorT8EwvdKYBwDkDuvEyPWDOR4ACjD45_JTWup0GXZXN_I_Wr3LQyLRgVFL-01j_nKcDDeoEMFcFSq1a82yNL9QRurb-oo-AMXhJTkjwSes8k-H3T4_gB9ek0LbFDK_nIR5YE5deHQ8QndvAnshNQPeB5JzdAuqkaSou78I6wcY8NKATAkPh8EbHCR_DXUw',
    altText: 'Artisanal block-printed wild mulberry silk stole featuring earthy madder red and indigo Dabu mud resist patterns',
    stock: 8,
    leadTime: 'Ready to ship',
    materials: ['Mulberry Silk', 'Bagru River Mud Resist', 'Alizarin Madder Roots'],
    dimensions: '200cm × 70cm',
    provenanceDetails: {
      technique: 'Wooden hand block print with Dabu mud resist dyeing',
      heritageAge: '450-year-old Chippa community tradition',
      fairWagePercentage: 90,
      hoursToCraft: 9.5,
    },
    story: 'Printed in the open sunlit drying fields of Bagru village using hand-carved teakwood blocks. Black clay, gum, and wheat chaff are stamped as a resist paste before dipping in deep madder and pomegranate baths.'
  }
];

export const ARTISANS: Artisan[] = [
  {
    id: 'artisan-meera',
    name: 'Meera Sharma',
    title: 'Master Potter',
    location: 'Jaipur, India',
    experienceYears: 24,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbj5c170EITOrGkLnV9wm5pMmTdHq48YgAhTO8cYEq4rXmsYLK8Xqx5YHaeLGKR0Qc-cigY4DNGQc7IXdm9PqI8PBmObOlwLLBsBUuEvxbTPeoiqeMlTu8z4PP5UFeAeEv2h23Zxkm3XOKblLUkqVHMylt_Ge4fBnDTFMGyFqK0X4TxP_MokYEAZwRbfewtyoMCJFaNm9BS-78kmXgcYXl5H2BKxjr9JHyPUetRkQSzUGGWaHXyw1zAA',
    quote: 'Clay listens to the rhythm of your hands. When you buy a bowl, you take home a moment of stillness.',
    bio: 'Meera learned pottery sitting beside her grandmother on the mud courtyards of Rajasthan. Her vessels honor classic Vedic proportions while exploring unglazed raw terracotta and subtle natural iron washes.',
    craft: 'Terracotta & Earthenware',
    guildCertification: 'Heritage Guild of Rajasthan #IND-JP-409',
    featuredProductIds: ['prod-1']
  },
  {
    id: 'artisan-someshwar',
    name: 'Someshwar Dev',
    title: '5th Generation Weaver',
    location: 'Telangana, India',
    experienceYears: 32,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFbMQ-oXlJwyaGlfLki8WUs0e5CpBkxgTguTvcQboSqrhaLCFmaj1ok6P2IjT25hV9LU9i8WM1_PFN30I3FujEUKQ8s3Ezr_W1ZmE21NzP2ccAZWszDxDwj45RslORUoC1Vov2DC6FeAx5ud3NmEVoNeSKDBY1y4XxXZukl2CsJjp0IaDcg3bK3bF5QFe7PMHIIfHfYA5aR4hJedG9xMOnGgrhuKHGVKcEAp2rIMvFUu5NBAAiEUm2GA',
    quote: 'Every thread in this Ikat carries a mathematical rhythm passed down from my great-grandfather.',
    bio: 'Custodian of one of the few remaining continuous pit-loom weaving lineages in Pochampally. Someshwar calculates double-ikat geometry without software, memorizing 300-step dye permutations as traditional spoken verse.',
    craft: 'Handloom Ikat & Mulberry Silk',
    guildCertification: 'Pochampally Handloom Master Guild #TEL-PC-118',
    featuredProductIds: ['prod-2']
  },
  {
    id: 'artisan-harish',
    name: 'Harish Chandra',
    title: 'Master Brass Engraver',
    location: 'Moradabad, India',
    experienceYears: 28,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_xeWkHSWq1fAOq5gIRVt4LE7avviTg3-_oKu8wfaEVHTaMzLk55EEUzL_S3hb0rmrrQEHfCVoEvaFkBEG9zhcZW00W2JyZDCzBiR4vVk3G-_hHc5Q-d3psY0-P6O9tgmSMKtgOMiIUOX95-6Fr7jkXZyMCDp01rBojFB0ijOEpXIdPJJCFzIOV7d41MgzCY8LiDFm1HqkI3l8Xq36ZpTLvklkl2VYYFjaG5hqQqKjqW3WvOk2Xkdbqw',
    quote: 'The chisel does not forgive haste. Each petal on the lotus diya requires patience and reverence.',
    bio: 'Harish represents Moradabad’s illustrious brass trade. Working with miniature hand-forged chisels, his relief carving requires zero mechanical templates—pure spatial intuition honed over three decades.',
    craft: 'Chiseled Brass & Lost-Wax Casting',
    guildCertification: 'Brass Artisans Guild Moradabad #UP-MB-77',
    featuredProductIds: ['prod-3']
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    title: 'From Loom to Living Room: The Sacred Geometry of Handwoven Ikat',
    tag: 'Technique Breakdown',
    readTime: '6 Min Read',
    author: 'Ananya Roy · Curatorial Director',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVEplTqoymzJbtc7TrxCKRHm0SAwEM6zelZUUkN5tQ5fUa-yNYkWP-fjRksWQTivRy5JOkK2V1gChK682w2vdq1LlRGgMXiXAnWjGixKDEjaMpsvq0cxX2z1MycDdHOzKWqlxt4kg2tObMjOnNeUF-6d-ScyGVeb7bJz7UA3NrUsmLP1j4SQ9Pmi2lShkd2mimY1m0xFMmcyDvibSnb3AOv_ZNAvFDYf_dDY70LB2nkp4byM69BGyTOw',
    summary: 'Unlike surface prints, the warp and weft of Ikat are dyed before weaving begins—a grueling process where mistakes of a millimeter destroy weeks of labor. We traveled to Pochampally to document how families calculate the patterns in verse.',
    content: [
      'In the quiet early morning light of Telangana, threads of raw silk stretch across eighty yards of wooden pegs. What appears to be an abstract cluster of dyed knots is actually an intricate mathematical algorithm that will later materialize into symmetrical diamond blossoms.',
      'Unlike surface roller printing or screen-printed yardage, true double Ikat ties every single thread in precise bundles before entering the fermented indigo vat. When mounted on the pit loom, even a shift of two millimeters will distort the final composition.',
      'Master weavers calculate these offsets not on paper, but through rhyming oral chants passed down across half a millennium. In an age of high-speed mass synthetic manufacturing, this slow, deliberate dedication reminds us of the transcendent sanctity of the human hand.'
    ]
  },
  {
    id: 'art-2',
    title: 'The Science of Jaipur Blue Pottery: Clay Without Earth',
    tag: 'Material Science',
    readTime: '4 Min Read',
    author: 'Dr. Tariq Mirza · Heritage Metallurgist',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbKxpGEx-52Mo5_QowCUjGZNeNlkRf-G8tIRwKaKk06SOFuj2FjjOu1xzFPKJc7JYgmt5EwwrNa3MwzvIByKTNc5AlRZWEn4cFV0ydP13lP1sikgYPuDMowIdLUgpRttXEig1bvADHZPtxEPADWo-Pb9yijl48yECOHws0mD-fLPKhYUbDZfxvDq64kZn1xGeHJy5vDhhmrw-LQ595f0wQo3EdfShwH64y_S4YSn_d53eQaQqgLprN5Q',
    summary: 'How quartz powder, fuller’s earth, and natural gum replace traditional clay in Rajasthan\'s unique craft.',
    content: [
      'Enter an authentic Jaipur blue pottery atelier, and you will notice something peculiar: there is no puddle of wet river clay anywhere on the floor. Instead, artisans mix ground quartz stone, glass dust, katira gum, and multani mitti (Fuller’s earth).',
      'This unique paste yields pottery that does not shrink significantly during drying, allowing crisp circular and hexagonal forms to hold their architectural profile. The signature turquoise and cobalt glazes are produced by combining copper oxide and pure cobalt salts fired in low-temperature muffle kilns.',
      'The result is a light, glass-like ceramic that has graced royal havelis since the 17th century.'
    ]
  },
  {
    id: 'art-3',
    title: 'Lost-Wax Brass Casting in Moradabad',
    tag: 'Living Heritage',
    readTime: '5 Min Read',
    author: 'Elena Rostova · Craft Anthropologist',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDefGtBCPm301YgGTpnO1W3fKn84xTg-L0bYmnzJZEq5LgTXzhqeBlqk3tP_DGQg29aefrqlE-RuHRJc4queA3E98ucVIA3ARe1BMV5TTc2AsIAzaizbNyh6DZW8zcwORwnn5jc4VNPfo0EduQOdSLIC0cuh4UMcsmqhw-pMQMHtHFJ48Tmk42HW4761XaC5PeONt1gQLM-67P49ZJJkquGBLedeavvTpBaeXbj8m_tjpAZLigBdDXFxA',
    summary: 'Tracing a 4,000-year-old metallurgical lineage that survived empire, industrialization, and mass manufacturing.',
    content: [
      'In the historic metal quarters of Moradabad, molten brass at over 1,000°C is ladled into clay-encased wax cores. As the wax melts away into the subterranean soil, the glowing bronze fills the vacant cavity, capturing down to the micron every finger print and chisel stroke pressed into the beeswax.',
      'This cire perdue method is identical to the techniques that created the Dancing Girl of Mohenjo-daro four thousand years ago. In our hands, these objects carry not just weight, but the uninterrupted memory of human civilization.'
    ]
  }
];

export const HERITAGE_DISCIPLINES = [
  {
    id: 'pottery',
    name: 'Pottery & Ceramics',
    count: '620+ Pieces',
    desc: 'Hand-thrown earthenware, glazed stoneware & studio ceramics.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv5vAbXac_Z72dP9qzA6cQQ71GcUe64_05qyfaLA5N-2qJxb58EugOjjmH68SuUmGVmNiKaUjrKZMIEmKU8Y6rLRR2tv8w1AslEavncTP7Yj67r8d68w7VZFo6Muqg99Hy7l2BEAG_0gOdfWkZA7GNlkP-AASgGWbDyIda9myrXLqHWDxbNZ0V32f7esn54DnVIZnNPkgaMR-l3-6ge5i6YNXep3lkC_CmlExWfyWJ95inzY4k023ppg',
    origins: ['Jaipur', 'Khurja', 'Nizhny Novgorod', 'Kyoto']
  },
  {
    id: 'textiles',
    name: 'Textiles & Weaving',
    count: '1,140+ Pieces',
    desc: 'Natural-dyed handloom ikat, pashmina & wild mulberry silk.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo5yiuWZADXkp-GXGmmW8ACU_hh5KHRtR1c0ia5ulwmsck6Vhsk0d-fYzIfpGWJEgQtFSFrprwK0FnddktLJdO25F5Q-zRq_VRQhhl2w6TPubKn7xHGnUhGLjczWCNCqj_Ha9InfDMu42JMcgH8lNAEnWodbetETnQ08TE45Eb4UefBEYx88Ry7qdTbF_isDDXuMiKbupmjK-GBchA_5335H9j3c0ZOJWYyyEzcS0BG00B1kebHmy-8A',
    origins: ['Pochampally', 'Bagru', 'Oaxaca', 'Cusco']
  },
  {
    id: 'metalwork',
    name: 'Metalwork & Brass',
    count: '430+ Pieces',
    desc: 'Hand-engraved brassware, bell metal & lost-wax casting.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1PDg1oxPmKbyTdM3Iui8rY48UllXVUKiSiuG4mF0v5KDpkG3iRbnfr8a7MRDmyVENQzy_h03zb_4FXy164zUPyXD_A1da9lM36N6rmELhyXKaH0Zm8g9krAvuJLUpxatLBS0yPJujWjS29QBFVUvi_jaR6dhi4nhJ9MQ_-rnzGiESkmSti5NUvgu2NU6Dmtd-QGn7ph8CKre2URO5_ZJJ8EjGIotyW5wvgIBmFRcDBlg3jL7GzZkbag',
    origins: ['Moradabad', 'Bastar', 'Fez', 'Damascus']
  },
  {
    id: 'woodcraft',
    name: 'Woodcraft & Carving',
    count: '510+ Pieces',
    desc: 'Reclaimed teak, walnut filigree & turned vessels.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWkXHnu_zSM1kGjCbNQagktbiel8zt-46-ElmqwLH6CI3zTSa0WqQUdb-Pt-NER0_VnnsyDzA6okAMniSM-LrFf6YeN0eHCxKOf0X4t0-MHQAce6H6Dd0lJZ6Fqt9kbc3YA9RRSMWU53pWwMHtvfEY3gQO4SCky1GNCKrAzmn_491X_eEIB_A0JXAA0JQ9Os713PiB2bMfUO3cOgMdZ9YMC8H9NjnRgyvnuh57IBAa33aPKw23BAmCUg',
    origins: ['Ubud', 'Saharanpur', 'Srinagar', 'Chiang Mai']
  }
];
