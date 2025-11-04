import { HttpParams } from '@angular/common/http';

/**
 * Chuyển object thành HttpParams (Angular)
 * @param value Object chứa key-value
 * @returns HttpParams để dùng trong HttpClient
 */
export function objectToHttpParams(value: Record<string, any> | null | undefined): HttpParams {
  let params = new HttpParams();

  if (!value || typeof value !== 'object') return params;

  for (const [key, val] of Object.entries(value)) {
    if (val === undefined || val === null || val === '') continue;

    if (Array.isArray(val)) {
      val.forEach((v) => {
        if (v !== undefined && v !== null && v !== '') {
          params = params.append(key, String(v));
        }
      });
    } else {
      params = params.set(key, String(val));
    }
  }

  return params;
}
