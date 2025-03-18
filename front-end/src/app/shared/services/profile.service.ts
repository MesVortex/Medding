import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
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

  getVendorProfileForUser(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/vendors/${id}`);
  }

  updateProfile(id: number, profileData: any): Observable<Profile> {
    const endpoint = profileData.role === 'VENDOR' ?
      `${this.apiUrl}/vendors/${id}` :
      `${this.apiUrl}/users/${id}`;

    // If password fields are present, send to password update endpoint
    if (profileData.currentPassword) {
      const passwordData = {
        currentPassword: profileData.currentPassword,
        newPassword: profileData.newPassword
      };
      return this.http.put<Profile>(`${this.apiUrl}/${id}/password`, passwordData)
        .pipe(
          catchError((error) => {
            // Ensure we properly handle and propagate the error message
            if (error.error?.message) {
              throw error.error;
            }
            throw error;
          })
        );
    }

    // Remove password fields if present
    const { currentPassword, newPassword, confirmPassword, ...data } = profileData;
    return this.http.put<Profile>(endpoint, data);
  }
}
