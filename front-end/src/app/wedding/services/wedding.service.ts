import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeddingRequest, WeddingResponse } from '../models/wedding.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeddingService {
  private apiUrl = `${environment.apiUrl}/api/weddings`;

  constructor(private http: HttpClient) {}

  createWedding(wedding: WeddingRequest): Observable<WeddingResponse> {
    return this.http.post<WeddingResponse>(this.apiUrl, wedding);
  }

  getWeddings(): Observable<WeddingResponse[]> {
    return this.http.get<WeddingResponse[]>(this.apiUrl);
  }

  getOrganizerWeddings(): Observable<WeddingResponse[]> {
    return this.http.get<WeddingResponse[]>(`${this.apiUrl}/organizer`);
  }
}
