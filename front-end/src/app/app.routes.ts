import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import {CreateWeddingComponent} from "./wedding/components/create-wedding/create-wedding.component";
import {WeddingDetailsComponent} from "./wedding/components/wedding-details/wedding-details.component";
import {UpdateWeddingComponent} from "./wedding/components/update-wedding/update-wedding.component";
import {ServiceDetailsComponent} from "./weddingService/components/service-details/service-details.component";
import {VendorProfileComponent} from "./shared/components/vendor-profile/vendor-profile.component";

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
    path: 'vendors/:id',
    component: VendorProfileComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'ORGANIZER' }
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
    data: { requiredRole: 'ORGANIZER' }
  },
  {
    path: 'weddings',
    loadComponent: () => import('./wedding/components/wedding-list/wedding-list.component').then(m => m.WeddingListComponent),
    canActivate: [AuthGuard],
    data: { requiredRole: 'ORGANIZER' }
  },
  {
    path: 'weddings/:id',
    component: WeddingDetailsComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'ORGANIZER' }
  },
  {
    path: 'weddings/:id/edit',
    component: UpdateWeddingComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'ORGANIZER' }
  },
  {
    path: 'services',
    loadComponent: () => import('./weddingService/components/wedding-service/wedding-service.component').then(m => m.WeddingServiceComponent),
    canActivate: [AuthGuard],
    data: { requiredRole: 'VENDOR' }
  },
  {
    path: 'services/browse',
    loadComponent: () => import('./weddingService/components/service-browse/service-browse.component').then(m => m.ServiceBrowseComponent),
    canActivate: [AuthGuard],
    data: { requiredRole: 'ORGANIZER' }
  },
  {
    path: 'services/:id/details',
    component: ServiceDetailsComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'ORGANIZER' }
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
