import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Animal } from '../../animals/animals.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private sourceObject = new BehaviorSubject<Animal>(new Animal());
  public currentObject = this.sourceObject.asObservable();

  constructor() {}

  public changeObject(object: Animal): void {
    this.sourceObject.next(object);
  }
}
