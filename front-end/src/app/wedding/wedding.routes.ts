import { Routes } from '@angular/router';

export const WEDDING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/wedding-list/wedding-list.component')
      .then(m => m.WeddingListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./components/create-wedding/create-wedding.component')
      .then(m => m.CreateWeddingComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./components/wedding-details/wedding-details.component')
      .then(m => m.WeddingDetailsComponent)
  },
  {
    path: ':id/guests',
    loadComponent: () => import('../guest/components/guest-list/guest-list.component')
      .then(m => m.GuestListComponent)
  }
];
