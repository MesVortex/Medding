export interface ServiceResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  vendorName: string;
  availability: boolean;
}

export interface ServiceRequest {
  title: string;
  description: string;
  price: number;
  category: string;
  availability: boolean;
}
