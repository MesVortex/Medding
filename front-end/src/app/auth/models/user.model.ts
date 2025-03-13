export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: 'ORGANIZER' | 'VENDOR';
  phoneNumber: string;
  location?: string;
}
