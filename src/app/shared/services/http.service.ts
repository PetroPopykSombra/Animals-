import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) {}

  public get<T>(url: string, queryParams?: any): Observable<Object> {
    return this.http.get(environment.APIPath + url, {params: queryParams});
  }
}
