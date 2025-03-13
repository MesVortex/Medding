import {User} from "./user.model";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: 'ORGANIZER' | 'VENDOR';
}

export interface AuthResponse {
  token: string;
  user: User;
}
