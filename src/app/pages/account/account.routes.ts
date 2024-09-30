// Angular modules
import { Routes } from '@angular/router';

export const routes : Routes = [
  {
    path     : '',
    children : [
      {
        path       : '',
        redirectTo : 'profile',
        pathMatch  : 'full',
      },
      {
        path          : 'profile',
        loadComponent : () => import('./profile/profile.component').then(m => m.MyAccountComponent),
      },
    ]
  }
];