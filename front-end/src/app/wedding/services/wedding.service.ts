import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeddingRequest, WeddingResponse } from '../models/wedding.model';
import { environment } from '../../../environments/environment';
import {ServiceBookingResponse} from "../../weddingService/models/wedding-service.model";

@Injectable({
  providedIn: 'root'
})
export class WeddingService {
  private apiUrl = `${environment.apiUrl}/api/weddings`;

  constructor(private http: HttpClient) {}

  createWedding(wedding: WeddingRequest): Observable<WeddingResponse> {
    return this.http.post<WeddingResponse>(this.apiUrl, wedding);
  }

  getOrganizerWeddings(): Observable<WeddingResponse[]> {
    return this.http.get<WeddingResponse[]>(`${this.apiUrl}/organizer`);
  }

  getWeddingWithServices(id: number): Observable<WeddingResponse> {
    return this.http.get<WeddingResponse>(`${this.apiUrl}/${id}/details`);
  }

  updateWedding(id: number, wedding: WeddingRequest): Observable<WeddingResponse> {
    return this.http.put<WeddingResponse>(`${this.apiUrl}/${id}`, wedding);
  }

  deleteWedding(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
