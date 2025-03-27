import { Routes } from '@angular/router';
import {AuthGuard} from "../auth/guards/auth.guard";

export const SERVICE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/wedding-service/wedding-service.component')
      .then(m => m.WeddingServiceComponent),
    canActivate: [AuthGuard],
    data: { requiredRole: 'VENDOR' }
  },
  {
    path: 'browse',
    loadComponent: () => import('./components/service-browse/service-browse.component')
      .then(m => m.ServiceBrowseComponent),
    canActivate: [AuthGuard],
    data: { requiredRole: 'ORGANIZER' }
  },
  {
    path: ':id/details',
    loadComponent: () => import('./components/service-details/service-details.component')
      .then(m => m.ServiceDetailsComponent),
    canActivate: [AuthGuard],
    data: { requiredRole: 'ORGANIZER' }
  },
  {
    path: 'bookings',
    loadComponent: () => import('./components/vendor-bookings/vendor-bookings.component')
      .then(m => m.VendorBookingsComponent),
    canActivate: [AuthGuard],
    data: { requiredRole: 'VENDOR' }
  },
  {
    path: ':id/wizard',
    loadComponent: () => import('./components/service-booking-wizard/service-booking-wizard.component')
      .then(m => m.ServiceBookingWizardComponent),
    canActivate: [AuthGuard],
    data: { requiredRole: 'ORGANIZER' }
  }
];
