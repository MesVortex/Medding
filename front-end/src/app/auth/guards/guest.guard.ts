import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthState } from "../store/auth.state";

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(
    private readonly store: Store<{ auth: AuthState }>,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select((state) => state.auth).pipe(
      take(1),
      map((authState) => {
        if (authState.isAuthenticated) {
          // Redirect authenticated users based on their role
          this.redirectBasedOnRole(authState.user?.role!);
          return false;
        }
        return true;
      })
    );
  }

  private redirectBasedOnRole(role: string): void {
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'VENDOR':
        this.router.navigate(['/services']);
        break;
      case 'ORGANIZER':
        this.router.navigate(['/weddings']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }
}
