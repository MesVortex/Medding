import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {ReviewRequest, ReviewResponse} from "../models/review.model";
import {VendorProfile} from "../../shared/models/profile.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/api/reviews`;

  constructor(private http: HttpClient) {}

  getVendorReviews(vendorId: number): Observable<ReviewResponse[]> {
    return this.http.get<ReviewResponse[]>(`${this.apiUrl}/vendor/${vendorId}`);
  }

  createReview(review: ReviewRequest): Observable<ReviewResponse> {
    return this.http.post<ReviewResponse>(this.apiUrl, review);
  }
}
