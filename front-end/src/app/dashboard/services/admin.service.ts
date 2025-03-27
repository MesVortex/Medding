import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VendorProfile } from '../../shared/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getAllVendors(): Observable<VendorProfile[]> {
    return this.http.get<VendorProfile[]>(`${this.apiUrl}/vendors`);
  }

  verifyVendor(id: number): Observable<VendorProfile> {
    return this.http.put<VendorProfile>(`${this.apiUrl}/admin/vendors/${id}/verify`, {});
  }

  unverifyVendor(id: number): Observable<VendorProfile> {
    return this.http.put<VendorProfile>(`${this.apiUrl}/admin/vendors/${id}/unverify`, {});
  }
}
