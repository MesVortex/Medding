import { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../shared/components/profile/profile.component')
      .then(m => m.ProfileComponent)
  },
  {
    path: 'edit',
    loadComponent: () => import('../shared/components/edit-profile/edit-profile.component')
      .then(m => m.EditProfileComponent)
  }
];
