import { Routes } from '@angular/router';

export const VENDOR_ROUTES: Routes = [
  // {
  //   path: 'dashboard',
  //   loadComponent: () => import('./components/vendor-dashboard/vendor-dashboard.component')
  //     .then(m => m.VendorDashboardComponent)
  // },
  {
    path: ':id',
    loadComponent: () => import('../shared/components/vendor-profile/vendor-profile.component')
      .then(m => m.VendorProfileComponent)
  }
];
