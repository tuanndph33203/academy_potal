import { inject, Injectable, PLATFORM_ID, TransferState } from '@angular/core';
import { HttpService } from './http.service';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { environment } from '../../../environments/environment';
import { IResponse } from '../models/common.model';
import { Movie, MovieItem } from '../models/movie.model';
import { Observable } from 'rxjs';
import { getCached } from '../../share/util/cache.util';
import { TypeFilm } from '../constants/film.constant';
import { objectToHttpParams } from '../../share/util/objectToParams.util';

@Injectable({ providedIn: 'root' })
export class FilmService {
  private http = inject(HttpService);
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = environment.apiUrl;

  private cache = new Map<string, { time: number; data$: Observable<any> }>();

  getNewUpdates(): Observable<IResponse<MovieItem[]>> {
    return getCached<IResponse<MovieItem[]>>(
      'new-updates',
      () =>
        this.http.get<IResponse<MovieItem[]>>(
          `${this.apiUrl}/${API_ENDPOINTS.FILM.NEW_UPDATES_V3}`,
        ),
      this.cache,
      this.transferState,
      this.platformId,
    );
  }

  getFilms(type: TypeFilm, params?: any): Observable<IResponse<any>> {
    const queryParams = objectToHttpParams(params);
    return getCached<IResponse<any>>(
      `${type}-${queryParams}`,
      () =>
        this.http.get<IResponse<any>>(
          `${this.apiUrl}/${API_ENDPOINTS.FILM.LIST}/${type}`,
          queryParams,
        ),
      this.cache,
      this.transferState,
      this.platformId,
    );
  }

  getFilm(slug: string): Observable<IResponse<any>> {
    console.log(`${this.apiUrl}/${API_ENDPOINTS.FILM.DETAIL}/${slug}`);

    return getCached<IResponse<any>>(
      `${slug}`,
      () => this.http.get<IResponse<any>>(`${this.apiUrl}/${API_ENDPOINTS.FILM.DETAIL}/${slug}`),
      this.cache,
      this.transferState,
      this.platformId,
    );
  }

  clearCache(): void {
    this.cache.clear();
  }
}
