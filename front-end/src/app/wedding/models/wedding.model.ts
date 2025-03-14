export interface WeddingRequest {
  bride: string;
  groom: string;
  budget: number;
  date: Date;
  location: string;
}

export interface WeddingResponse {
  id: number;
  bride: string;
  groom: string;
  budget: number;
  date: Date;
  location: string;
  organizerName: string;
}
