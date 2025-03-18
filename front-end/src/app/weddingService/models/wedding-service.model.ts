export interface ServiceResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  category: WeddingServiceCategory;
  vendorName: string;
  vendorId: number;
  availability: boolean;
}

export interface ServiceRequest {
  title: string;
  description: string;
  price: number;
  category: WeddingServiceCategory;
  availability: boolean;
}

export enum WeddingServiceCategory {
  VENUE_AND_DECORATION = "VENUE_AND_DECORATION",
  ATTIRE_AND_BEAUTY = "ATTIRE_AND_BEAUTY",
  CATERING_AND_SWEETS = "CATERING_AND_SWEETS",
  ENTERTAINMENT_AND_MUSIC = "ENTERTAINMENT_AND_MUSIC",
  PHOTOGRAPHY_AND_VIDEOGRAPHY = "PHOTOGRAPHY_AND_VIDEOGRAPHY",
  TRANSPORTATION_AND_LOGISTICS = "TRANSPORTATION_AND_LOGISTICS",
  WEDDING_FAVORS_AND_GIFTS = "WEDDING_FAVORS_AND_GIFTS"
}

export const WeddingServiceCategoryLabels: Record<WeddingServiceCategory, string> = {
  [WeddingServiceCategory.VENUE_AND_DECORATION]: "Venue & Decoration",
  [WeddingServiceCategory.ATTIRE_AND_BEAUTY]: "Traditional Wedding Attire & Beauty",
  [WeddingServiceCategory.CATERING_AND_SWEETS]: "Catering & Sweets",
  [WeddingServiceCategory.ENTERTAINMENT_AND_MUSIC]: "Entertainment & Music",
  [WeddingServiceCategory.PHOTOGRAPHY_AND_VIDEOGRAPHY]: "Photography & Videography",
  [WeddingServiceCategory.TRANSPORTATION_AND_LOGISTICS]: "Transportation & Logistics",
  [WeddingServiceCategory.WEDDING_FAVORS_AND_GIFTS]: "Wedding Favors & Gifts"
};

export interface ServiceBookingRequest {
  weddingId: number;
}

export interface ServiceBookingResponse {
  id: number;
  serviceId: number;
  weddingId: number;
  serviceName: string;
  vendorName: string;
  bookedAt: Date;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}
