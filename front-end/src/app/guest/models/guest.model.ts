export enum RsvpStatus {
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING'
}

export interface GuestRequest {
  name: string;
  email: string;
  rsvpStatus: RsvpStatus;
  weddingId: number;
}

export interface GuestResponse {
  id: number;
  name: string;
  email: string;
  rsvpStatus: RsvpStatus;
  weddingId: number;
}
