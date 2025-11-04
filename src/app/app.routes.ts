import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature/home/home').then((m) => m.Home),
    data: {
      title: 'Trang Chủ',
      description: 'Welcome to the Home Page of our Angular Application.',
    },
  },
  {
    path: 'watch/:slug',
    loadComponent: () => import('./feature/watch/watch').then((m) => m.Watch),
    data: {
      title: 'Trang Xem Phim Số 1',
      description: 'Welcome to the Home Page of our Angular Application.',
    },
  },
];
