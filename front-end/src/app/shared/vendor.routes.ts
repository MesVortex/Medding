import {Routes} from '@angular/router';
import {AuthGuard} from "../auth/guards/auth.guard";

export const VENDOR_ROUTES: Routes = [
  {
    path: 'browse',
    loadComponent: () => import('../shared/components/vendor-list/vendor-list.component').then(m => m.VendorListComponent),
    canActivate: [AuthGuard],
    data: {roles: ['ORGANIZER']}
  },
  {
    path: ':id',
    loadComponent: () => import('../shared/components/vendor-profile/vendor-profile.component')
      .then(m => m.VendorProfileComponent)
  }
];
