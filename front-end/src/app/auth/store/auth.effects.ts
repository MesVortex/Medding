import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ request }) =>
        this.authService.login(request).pipe(
          map((response) => {
            localStorage.setItem('token', response.token);
            return AuthActions.loginSuccess({ response });
          }),
          catchError((error) => {
            let errorMessage = 'An error occurred during login';
            if (error.status === 401) {
              errorMessage = error.error.message || 'Invalid email or password';
            } else if (error.error?.message) {
              errorMessage = error.error.message;
            }
            return of(AuthActions.loginFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ request }) =>
        this.authService.register(request).pipe(
          map((response) => {
            localStorage.setItem('token', response.token);
            return AuthActions.registerSuccess({ response });
          }),
          catchError((error) =>
            of(AuthActions.registerFailure({ error: error.message }))
          )
        )
      )
    )
  );

  initializeAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      mergeMap(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          return of(AuthActions.loadUserFailure({ error: 'No token found' }));
        }
        return this.authService.getCurrentUser().pipe(
          map(user => AuthActions.loadUserSuccess({ user })),
          catchError(error => of(AuthActions.loadUserFailure({ error: error.message })))
        );
      })
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess, AuthActions.loadUserSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );

  // Add unauthorized error handling
  unauthorizedError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loadUserFailure),
        tap(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
