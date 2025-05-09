import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ServiceBookingRequest,
  ServiceBookingResponse,
  ServiceRequest,
  ServiceResponse, WeddingServiceCategory
} from '../models/wedding-service.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeddingServiceService {
  private apiUrl = `${environment.apiUrl}/api/services`;

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<ServiceResponse[]> {
    return this.http.get<ServiceResponse[]>(this.apiUrl);
  }

  getVendorServices(): Observable<ServiceResponse[]> {
    return this.http.get<ServiceResponse[]>(`${this.apiUrl}/vendor/me`);
  }

  createService(service: ServiceRequest): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(this.apiUrl, service);
  }

  updateService(id: number, service: ServiceRequest): Observable<ServiceResponse> {
    return this.http.put<ServiceResponse>(`${this.apiUrl}/${id}`, service);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getServicesByCategory(category: WeddingServiceCategory): Observable<ServiceResponse[]> {
    return this.http.get<ServiceResponse[]>(`${this.apiUrl}/category/${category}`);
  }

  bookService(serviceId: number, booking: ServiceBookingRequest): Observable<ServiceBookingResponse> {
    return this.http.post<ServiceBookingResponse>(`${this.apiUrl}/${serviceId}/book`, booking);
  }

  getServiceById(id: number): Observable<ServiceResponse>{
    return this.http.get<ServiceResponse>(`${this.apiUrl}/${id}`);
  }

  getWeddingBookings(weddingId: number): Observable<ServiceBookingResponse[]> {
    return this.http.get<ServiceBookingResponse[]>(`${this.apiUrl}/bookings/wedding/${weddingId}`);
  }

  getVendorBookings(): Observable<ServiceBookingResponse[]> {
    return this.http.get<ServiceBookingResponse[]>(`${this.apiUrl}/bookings/vendor`);
  }

  confirmBooking(bookingId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/bookings/${bookingId}/confirm`, {});
  }

  cancelBooking(bookingId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/bookings/${bookingId}/cancel`, {});
  }
}
