import { Routes } from '@angular/router';

export const VENDOR_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () => import('../shared/components/vendor-profile/vendor-profile.component')
      .then(m => m.VendorProfileComponent)
  }
];
