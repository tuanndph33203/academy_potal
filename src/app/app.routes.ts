import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature/home/home').then((m) => m.Home),
    data: {
      title: 'Home Page',
      description: 'Welcome to the Home Page of our Angular Application.',
    },
  },
];
