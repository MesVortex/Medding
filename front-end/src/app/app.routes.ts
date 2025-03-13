import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/components/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
