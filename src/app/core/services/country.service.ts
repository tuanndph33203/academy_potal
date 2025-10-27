import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { Observable } from 'rxjs';
import { IResponse } from '../models/common.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpService);
  private apiUrl = environment.apiUrl;
  getCountrys(): Observable<IResponse<any[]>> {
    return this.http.get<IResponse<any[]>>(`${this.apiUrl}/${API_ENDPOINTS.COUNTRY}`);
  }
}
