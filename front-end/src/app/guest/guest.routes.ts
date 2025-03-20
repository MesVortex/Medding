import { Routes } from '@angular/router';

export const GUEST_ROUTES: Routes = [
  {
    path: 'rsvp/:token',
    loadComponent: () => import('../guest/components/rsvp/rsvp.component').then(m => m.RsvpComponent)
  }
];
