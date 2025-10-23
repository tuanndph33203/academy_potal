import { Routes } from '@angular/router';
import { Home } from './feature/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    data: {
      title: 'Home Page',
      description: 'Welcome to the Home Page of our Angular Application.',
    },
  },
];
