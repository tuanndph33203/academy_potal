import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { Observable } from 'rxjs';
import { Movie, MovieItem } from '../models/movie.model';
import { environment } from '../../../environments/environment';
import { IResponse } from '../models/common.model';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private http = inject(HttpService);
  private apiUrl = environment.apiUrl;

  getNewUpdates(): Observable<IResponse<MovieItem[]>> {
    return this.http.get<IResponse<MovieItem[]>>(`${this.apiUrl}${API_ENDPOINTS.NEW_UPDATES_V3}`);
  }

  getTrending(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}${API_ENDPOINTS.TRENDING}`);
  }

  getDetail(slug: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}${API_ENDPOINTS.MOVIE_DETAIL(slug)}`);
  }
}
