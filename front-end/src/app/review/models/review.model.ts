export interface ReviewRequest {
  vendorId: number;
  rating: number;
  comment: string;
}

export interface ReviewResponse {
  id: number;
  serviceId: number;
  organizerId: number;
  organizerName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
