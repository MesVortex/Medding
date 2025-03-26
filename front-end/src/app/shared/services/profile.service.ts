import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Profile, VendorProfile} from '../models/profile.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/api/profiles`;

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/me`);
  }

  getVendorProfile(id: number): Observable<VendorProfile> {
    return this.http.get<VendorProfile>(`${this.apiUrl}/vendors/${id}`);
  }

  updateProfile(id: number, profileData: any): Observable<Profile> {
    if (profileData.currentPassword) {
      if (!profileData.currentPassword.trim() || !profileData.newPassword.trim()) {
        return throwError(() => new Error('All password fields are required'));
      }

      const passwordData = {
        currentPassword: profileData.currentPassword,
        newPassword: profileData.newPassword
      };

      return this.http.put<Profile>(`${this.apiUrl}/${id}/password`, passwordData);
    }

    const { currentPassword, newPassword, confirmPassword, ...profileUpdateData } = profileData;

    const endpoint = profileData.role === 'VENDOR' ?
      `${this.apiUrl}/vendors/${id}` :
      `${this.apiUrl}/users/${id}`;

    return this.http.put<Profile>(endpoint, profileUpdateData);
  }
}
