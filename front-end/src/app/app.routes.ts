import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import {CreateWeddingComponent} from "./wedding/components/create-wedding/create-wedding.component";
import {WeddingDetailsComponent} from "./wedding/components/wedding-details/wedding-details.component";

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
  {
    path: 'weddings/create',
    loadComponent: () => import('./wedding/components/create-wedding/create-wedding.component').then(m => m.CreateWeddingComponent),
    canActivate: [AuthGuard],
    data: { roles: ['ORGANIZER'] }
  },
  {
    path: 'weddings',
    loadComponent: () => import('./wedding/components/wedding-list/wedding-list.component').then(m => m.WeddingListComponent),
    canActivate: [AuthGuard],
    data: { roles: ['ORGANIZER'] }
  },
  {
    path: 'weddings/:id',
    component: WeddingDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ORGANIZER'] }
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
