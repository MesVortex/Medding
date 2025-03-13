import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard],
    data: { requiredRole: 'ADMIN' }
  },
  // {
  //   path: 'vendor/dashboard',
  //   loadComponent: () => import('./vendor/dashboard/dashboard.component').then(m => m.VendorDashboardComponent),
  //   canActivate: [AuthGuard],
  //   data: { requiredRole: 'VENDOR' }
  // },
  // {
  //   path: 'admin/dashboard',
  //   loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.AdminDashboardComponent),
  //   canActivate: [AuthGuard],
  //   data: { requiredRole: 'ADMIN' }
  // },
  {
    path: 'profile',
    loadComponent: () => import('./shared/components/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/edit',
    loadComponent: () => import('./shared/components/edit-profile/edit-profile.component').then(m => m.EditProfileComponent),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'unauthorized',
  //   loadComponent: () => import('./shared/components/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  // },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
