import { Routes } from '@angular/router';
import { WatchResolver } from './core/resolvers/watch';

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
    path: ':type',
    loadComponent: () => import('./feature/film/film').then((m) => m.Film),
    data: {
      title: 'Trang Chủ',
      description: 'Welcome to the Home Page of our Angular Application.',
    },
  },
  {
    path: 'phim/:slug',
    loadComponent: () => import('./feature/watch/watch').then((m) => m.Watch),
    data: {
      title: 'Trang Xem Phim Số 1',
      description: 'Welcome to the Home Page of our Angular Application.',
    },
    resolve: { movie: WatchResolver },
  },
  {
    path: 'error/404',
    loadComponent: () => import('./feature/not-found/not-found').then((m) => m.NotFound),
    data: {
      title: '404 - Lỗi không tìm thấy trang',
      description: 'Welcome to the Home Page of our Angular Application.',
    },
  },
  {
    path: '**',
    loadComponent: () => import('./feature/not-found/not-found').then((m) => m.NotFound),
    data: {
      title: '404 - Lỗi không tìm thấy trang',
      description: 'Welcome to the Home Page of our Angular Application.',
    },
  },
];
