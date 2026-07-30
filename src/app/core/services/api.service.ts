import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

interface CacheEntry<T> {
  expiry: number;
  data: ApiResponse<T>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  
  // Response Cache Map with 5-minute TTL
  private cache = new Map<string, CacheEntry<any>>();
  // Active Request Deduplication Map
  private inFlightRequests = new Map<string, Observable<any>>();
  private readonly DEFAULT_TTL = 300000; // 5 minutes

  get<T>(endpoint: string, params?: any, cacheTtlMs: number = this.DEFAULT_TTL): Observable<ApiResponse<T>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    const cacheKey = `${endpoint}:${httpParams.toString()}`;

    // 1. Check in-memory cache
    if (cacheTtlMs > 0 && this.cache.has(cacheKey)) {
      const entry = this.cache.get(cacheKey)!;
      if (Date.now() < entry.expiry) {
        return of(entry.data);
      }
      this.cache.delete(cacheKey);
    }

    // 2. Check in-flight request deduplication
    if (this.inFlightRequests.has(cacheKey)) {
      return this.inFlightRequests.get(cacheKey)!;
    }

    // 3. Execute HTTP request with shareReplay & cache insertion
    const request$ = this.http.get<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, { params: httpParams }).pipe(
      tap(res => {
        if (cacheTtlMs > 0 && res.success) {
          this.cache.set(cacheKey, { expiry: Date.now() + cacheTtlMs, data: res });
        }
        this.inFlightRequests.delete(cacheKey);
      }),
      shareReplay(1)
    );

    this.inFlightRequests.set(cacheKey, request$);
    return request$;
  }

  post<T>(endpoint: string, body: any): Observable<ApiResponse<T>> {
    this.clearCache();
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, body);
  }

  put<T>(endpoint: string, body: any): Observable<ApiResponse<T>> {
    this.clearCache();
    return this.http.put<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, body);
  }

  delete<T>(endpoint: string): Observable<ApiResponse<T>> {
    this.clearCache();
    return this.http.delete<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`);
  }

  clearCache() {
    this.cache.clear();
  }
}
