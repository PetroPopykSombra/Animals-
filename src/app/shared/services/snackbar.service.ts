import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  public snackbarSubject = new Subject<string>();

  constructor() {}
}
