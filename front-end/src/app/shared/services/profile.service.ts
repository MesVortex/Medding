import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';
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

  getVendorProfile(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/vendors/${id}`);
  }
}
