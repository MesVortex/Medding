import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {VendorProfile} from "../models/profile.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private readonly apiUrl = `${environment.apiUrl}/api/vendors`;

  constructor(private http: HttpClient) {}

  getAllVendors(): Observable<VendorProfile[]> {
    return this.http.get<VendorProfile[]>(this.apiUrl);
  }
}
