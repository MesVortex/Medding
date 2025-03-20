import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GuestRequest, GuestResponse } from '../models/guest.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private apiUrl = `${environment.apiUrl}/api/guests`;

  constructor(private http: HttpClient) {}

  createGuest(guest: GuestRequest): Observable<GuestResponse> {
    return this.http.post<GuestResponse>(this.apiUrl, guest);
  }

  getGuestsByWeddingId(weddingId: number): Observable<GuestResponse[]> {
    return this.http.get<GuestResponse[]>(`${this.apiUrl}/wedding/${weddingId}`);
  }

  updateGuest(id: number, guest: GuestRequest): Observable<GuestResponse> {
    return this.http.put<GuestResponse>(`${this.apiUrl}/${id}`, guest);
  }

  deleteGuest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  sendInvitation(id: number): Observable<GuestResponse> {
    return this.http.post<GuestResponse>(`${this.apiUrl}/${id}/send-invitation`, {});
  }
}
