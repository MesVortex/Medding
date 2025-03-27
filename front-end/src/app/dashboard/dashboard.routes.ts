import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    data: { title: 'Dashboard' }
  },
  {
    path: 'users',
    loadComponent: () => import('./components/users/users.component')
      .then(m => m.UsersComponent),
    data: { title: 'Users' }
  },
  {
    path: 'vendors',
    loadComponent: () => import('./components/admin-vendors/admin-vendors.component')
      .then(m => m.AdminVendorsComponent),
    data: { title: 'Manage Vendors' }
  }
];
