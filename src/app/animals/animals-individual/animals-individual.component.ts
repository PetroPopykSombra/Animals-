import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from '../../shared/services/shared.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { Animal } from '../animals.model';
import { AnimalsService } from '../animals.service';

@Component({
  selector: 'app-animals-individual',
  templateUrl: './animals-individual.component.html',
  styleUrls: ['./animals-individual.component.scss']
})
export class AnimalsIndividualComponent implements OnInit, OnDestroy {

  public animal = new Animal();

  private unsubscribe$ = new Subject<void>();

  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private animalsService: AnimalsService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.sharedService.currentObject
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (animal) => {
        if (animal.name === '') {
          // handle if page was reloaded
          this.getPetId();
          this.getPet();
        } else {
          this.animal = animal;
        }
      });
  }

  private getPetId(): void {
    this.route.params
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (params: Params) => {
        this.animal.id = params['id'];
      }
    );
  }

  private getPet(): void {
    this.animalsService.getAnimal(this.animal.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data: Animal) => {
        this.animal = data;
      },
      (error: HttpErrorResponse) => {
        this.snackbarService.snackbarSubject.next(error.message);
      }
    );
  }

  public adoptAnimal(): void {
    this.animal.isAdopted = true;
    this.animalsService.adoptAnimal(this.animal)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data: Animal) => {
        this.animal = data;
        this.snackbarService.snackbarSubject.next('You have adopted this animal!');
      },
      (error: HttpErrorResponse) => {
        this.snackbarService.snackbarSubject.next(error.message);
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
