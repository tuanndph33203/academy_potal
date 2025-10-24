import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private http = inject(HttpClient);

  get<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(url, { params }).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Failed to retrieve data.'));
      }),
    );
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }
}
