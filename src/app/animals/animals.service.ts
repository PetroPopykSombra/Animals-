import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpService } from '../shared/services/http.service';
import { Animal } from './animals.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  private readonly animalsUrl = 'animals';

  constructor(
    private httpService: HttpService,
  ) {}

  getAnimals(pageNumber: number): Observable<object> {
    let params = new HttpParams();
    params = params.append('_page', pageNumber.toString());
    return this.httpService.get<Animal[]>(this.animalsUrl, params);
  }

  getAnimal(id: number): Observable<object> {
    return this.httpService.get<Animal>(`${this.animalsUrl}/${id}`);
  }

  adoptAnimal(data: Animal): Observable<object> {
    return this.httpService.put<Animal>(`${this.animalsUrl}/${data.id}`, data);
  }
}
