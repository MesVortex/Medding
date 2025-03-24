import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthState } from "../store/auth.state";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly store: Store<{ auth: AuthState }>,
    private readonly router: Router
  ) {}

  canActivate(route: any): Observable<boolean> {
    const requiredRole = route?.data?.requiredRole || '';

    return this.store.select((state) => state.auth).pipe(
      take(1),
      map((authState) => {
        // console.log('Auth State in Guard:', authState);

        // Handle authenticated users
        if (authState.isAuthenticated) {

          // Prevent authenticated users from accessing login/register
          if (route.routeConfig?.path === 'auth/login' || route.routeConfig?.path === 'register') {
            this.redirectBasedOnRole(authState.user?.role!);
            return false;
          }

          // Check if the user has the required role for the route
          if (requiredRole && authState.user?.role !== requiredRole) {
            this.router.navigate(['auth/login']);
            return false;
          }

          return true;
        }

        // Handle unauthenticated users
        if (!authState.isAuthenticated) {
          // Allow access to login/register for unauthenticated users
          if (route.routeConfig?.path === 'auth/login' || route.routeConfig?.path === 'register') {
            return true;
          }

          // Redirect unauthenticated users to login
          this.router.navigate(['auth/login']);
          return false;
        }

        return false;
      })
    );
  }

  private redirectBasedOnRole(role: string): void {
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['/dashboard']);
        break;
      case 'VENDOR':
        this.router.navigate(['/services']);
        break;
      case 'ORGANIZER':
        this.router.navigate(['/organizer']);
        break;
      default:
        this.router.navigate(['auth/login']);
        break;
    }
  }
}
