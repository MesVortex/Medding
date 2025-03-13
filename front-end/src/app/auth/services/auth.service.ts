import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.model';
import {environment} from "../../../environments/environment";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request);
  }

  // Handle errors at the HTTP interceptor level
  createAuthErrorInterceptor(): HttpInterceptor {
    return {
      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              // Clear token if it exists
              localStorage.removeItem('token');
            }
            return throwError(() => error);
          })
        );
      }
    };
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/profiles/me`);
  }
}
