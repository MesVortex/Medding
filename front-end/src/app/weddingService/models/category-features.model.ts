import { WeddingServiceCategory } from './wedding-service.model';

export const categoryFeatures: Record<WeddingServiceCategory, string[]> = {
  [WeddingServiceCategory.VENUE_AND_DECORATION]: [
    'Elegant and spacious venue for your ceremony and reception',
    'Professional staff to assist with setup and coordination',
    'Customizable floor plans to suit your wedding size',
    'Beautiful backdrop for wedding photos'
  ],
  [WeddingServiceCategory.CATERING_AND_SWEETS]: [
    'Delicious menu options customized to your preferences',
    'Professional service staff for your reception',
    'Accommodations for dietary restrictions and preferences',
    'Elegant presentation and table settings'
  ],
  [WeddingServiceCategory.ENTERTAINMENT_AND_MUSIC]: [
    'Professional musicians or DJ for your ceremony and reception',
    'Customized playlist based on your musical preferences',
    'State-of-the-art sound equipment',
    'MC services to guide your reception events'
  ],
  [WeddingServiceCategory.PHOTOGRAPHY_AND_VIDEOGRAPHY]: [
    'Capture every special moment of your wedding day',
    'Professional editing and retouching of all photos',
    'Online gallery to share with friends and family',
    'High-resolution digital files included'
  ],
  [WeddingServiceCategory.ATTIRE_AND_BEAUTY]: [
    'Professional styling and makeup services',
    'Traditional and modern attire options',
    'Alterations and fittings included',
    'Bridal party coordination'
  ],
  [WeddingServiceCategory.TRANSPORTATION_AND_LOGISTICS]: [
    'Luxury vehicle fleet for wedding party',
    'Professional drivers and coordination',
    'Flexible pickup and drop-off locations',
    'Wedding day timeline management'
  ],
  [WeddingServiceCategory.WEDDING_FAVORS_AND_GIFTS]: [
    'Customized wedding favors for your guests',
    'Wide selection of traditional and modern gifts',
    'Personalized packaging and presentation',
    'Bulk ordering discounts available'
  ]
};

export const categoryIcons: Record<WeddingServiceCategory, string> = {
  [WeddingServiceCategory.VENUE_AND_DECORATION]: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />`,
  [WeddingServiceCategory.CATERING_AND_SWEETS]: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />`,
  [WeddingServiceCategory.ENTERTAINMENT_AND_MUSIC]: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />`,
  [WeddingServiceCategory.PHOTOGRAPHY_AND_VIDEOGRAPHY]: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />`,
  [WeddingServiceCategory.ATTIRE_AND_BEAUTY]: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />`,
  [WeddingServiceCategory.TRANSPORTATION_AND_LOGISTICS]: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />`,
  [WeddingServiceCategory.WEDDING_FAVORS_AND_GIFTS]: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7h-7m0 0v7m0-7H6m7 7v7m-7-7H4m3 0v7m0-7H4m0 0v7m17-7h-3m0 0v7m0-7h-3m3 7h-3" />`
};
