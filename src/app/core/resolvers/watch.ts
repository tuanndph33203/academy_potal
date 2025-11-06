import { ResolveFn, Router } from '@angular/router';
import { FilmService } from '../services/film.service';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { inject } from '@angular/core';

export const WatchResolver: ResolveFn<any> = (route) => {
  const service = inject(FilmService);
  const router = inject(Router);
  const slug = route.paramMap.get('slug');
  return service.getFilm(slug!).pipe(
    map((res) => res?.items),
    catchError(() => {
      return EMPTY;
    }),
  );
};
