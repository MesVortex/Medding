export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  number: string;
  location?: string;
}

// export interface RegisterRequest {
//   username: string;
//   email: string;
//   password: string;
//   role: 'ORGANIZER' | 'VENDOR';
//   number: string;
//   location?: string;
// }
