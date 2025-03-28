import { Route } from '@angular/router';
import { AuthGuard } from './shared/guards';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin-management',
    loadChildren: () =>
      import('./modules/admin-management/admin-management.module').then((m) => m.AdminManagementModule),
  },
];
