// Central site config — mirrors the live main-site values (NOT the PPC funnel).
// Confirmed with Matt 2026-06-16: use the live main-site phone + GTM, not the
// ad-tracking values from the quote.* landing pages.

export const business = {
  name: 'Hometown Painting LLC',
  shortName: 'Hometown Painting',
  phoneDisplay: '405-400-1619',
  phoneHref: 'tel:4054001619',
  email: 'matt@hometownpaintingokc.com',
  address: {
    street: '13637 SE 114th St',
    city: 'Oklahoma City',
    region: 'OK',
    postalCode: '73165',
    country: 'US',
  },
  priceRange: '$$$',
  rating: { value: '4.9', count: '130' },
  social: { facebook: 'https://www.facebook.com/Hometownpaintingokc' },
  areas: [
    'Yukon', 'Mustang', 'Edmond', 'Nichols Hills', 'Deer Creek', 'The Village',
    'Bethany', 'Warr Acres', 'Piedmont', 'Mesta Park', 'Heritage Hills',
  ],
};

// Live main-site tracking (from the WordPress crawl, confirmed by Matt).
export const tracking = {
  gtm: 'GTM-NS8LBWQQ',
  googleAds: 'AW-16858477075',
  ga4: 'G-96VQPY702N',
  adsCallConversion: 'AW-16858477075/hyo3CMjMg8caEJPk3-Y-',
};

// Primary navigation (mirrors the live site's main service pages).
export const nav = [
  { label: 'Interior Painting', href: '/interior-painting-okc/' },
  { label: 'Exterior Painting', href: '/exterior-painting-oklahoma-city/' },
  { label: 'Fence Staining', href: '/fence-staining-okc/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact-us/' },
];
