import { Routes } from '@angular/router';

export const SERVICE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/wedding-service/wedding-service.component')
      .then(m => m.WeddingServiceComponent),
    data: { requiredRole: 'VENDOR' }
  },
  {
    path: 'browse',
    loadComponent: () => import('./components/service-browse/service-browse.component')
      .then(m => m.ServiceBrowseComponent),
    data: { requiredRole: 'ORGANIZER' }
  },
  {
    path: ':id/details',
    loadComponent: () => import('./components/service-details/service-details.component')
      .then(m => m.ServiceDetailsComponent),
    data: { requiredRole: 'ORGANIZER' }
  },
  {
    path: 'bookings',
    loadComponent: () => import('./components/vendor-bookings/vendor-bookings.component')
      .then(m => m.VendorBookingsComponent),
    data: { requiredRole: 'VENDOR' }
  }
];
