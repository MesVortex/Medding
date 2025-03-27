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
          console.log('User is authenticated');
          console.log('Required Role:', requiredRole);
          // Check if the user has the required role for the route
          if (requiredRole && authState.user?.role !== requiredRole) {
            this.router.navigate(['/unauthorized']);
            return false;
          }

          return true;
        }

        // Handle unauthenticated users
        if (!authState.isAuthenticated) {
          if (route.routeConfig?.path === 'auth/login' || route.routeConfig?.path === 'auth/register') {
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
}
