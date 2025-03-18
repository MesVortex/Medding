export interface Profile {
  id: number;
  username: string;
  email: string;
  role: string;
  number: string;
  location?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface VendorProfile {
  id: number;
  username: string;
  email: string;
  location: string;
  number: string;
  verified: boolean;
  verifiedAt: Date;
  services: ServiceDTO[];
}

export interface ServiceDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  vendorName: string;
}
