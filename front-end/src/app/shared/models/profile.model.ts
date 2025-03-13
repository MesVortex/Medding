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
