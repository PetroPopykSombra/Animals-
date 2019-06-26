import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) {}

  public get<T>(url: string, queryParams?: HttpParams): Observable<Object> {
    return this.http.get(environment.APIPath + url, {params: queryParams});
  }

  public put<T>(url: string, body: object): Observable<Object> {
    return this.http.put(environment.APIPath + url, body);
  }
}
