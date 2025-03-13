import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {MetaReducer, provideStore} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { authReducer } from './auth/store/auth.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { authInterceptor } from './auth/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import {localStorageSync} from "ngrx-store-localstorage";

export function localStorageSyncReducer(reducer: any): any {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
  }
  return reducer; // Return the original reducer if localStorage is not available
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ auth: authReducer }, { metaReducers }),
    provideEffects(AuthEffects),
    provideAnimations()
  ]
};
