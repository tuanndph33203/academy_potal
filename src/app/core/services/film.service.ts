import { inject, Injectable, PLATFORM_ID, TransferState } from '@angular/core';
import { HttpService } from './http.service';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { environment } from '../../../environments/environment';
import { IResponse } from '../models/common.model';
import { Movie, MovieItem } from '../models/movie.model';
import { Observable } from 'rxjs';
import { getCached } from '../../share/util/cache.util';

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
      () => this.http.get<IResponse<MovieItem[]>>(`${this.apiUrl}/${API_ENDPOINTS.NEW_UPDATES_V3}`),
      this.cache,
      this.transferState,
      this.platformId,
    );
  }

  getFilmByCountry(country: string): Observable<IResponse<any>> {
    return getCached<IResponse<any>>(
      `country-${country}`,
      () =>
        this.http.get<IResponse<any>>(
          `${this.apiUrl}/${API_ENDPOINTS.COLLECTION}?country=${country}`,
        ),
      this.cache,
      this.transferState,
      this.platformId,
    );
  }

  getTrending(): Observable<Movie[]> {
    return getCached<Movie[]>(
      'trending',
      () => this.http.get<Movie[]>(`${this.apiUrl}${API_ENDPOINTS.TRENDING}`),
      this.cache,
      this.transferState,
      this.platformId,
    );
  }

  getDetail(slug: string): Observable<Movie> {
    return getCached<Movie>(
      `detail-${slug}`,
      () => this.http.get<Movie>(`${this.apiUrl}${API_ENDPOINTS.MOVIE_DETAIL(slug)}`),
      this.cache,
      this.transferState,
      this.platformId,
    );
  }

  clearCache(): void {
    this.cache.clear();
  }
}
