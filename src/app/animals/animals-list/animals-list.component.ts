import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from '../../shared/services/shared.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { Animal, AnimalGenderEnum, AnimalTypeEnum, FilterOptions } from '../animals.model';
import { AnimalsService } from '../animals.service';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss']
})
export class AnimalsListComponent implements OnInit, OnDestroy {

  public readonly animalTypeEnum = AnimalTypeEnum;
  public readonly animalGenderEnum = AnimalGenderEnum;
  public animals = [] as Animal[];
  public isLastPage = false;
  public form: FormGroup;

  private page = 1;
  private initialArray = [] as Animal[];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private animalsService: AnimalsService,
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getAnimals();
    this.initFormChangeSubscriber();
  }

  private getAnimals(): void {
    this.animalsService.getAnimals(this.page)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data: Animal[]) => {
        this.copyArray(data);
        this.animals = this.animals.concat(data);
        // Initial filtering & filtering after pagination
        this.filterList(this.form.value);
        if (data.length < 10) {
          this.isLastPage = true;
        }
      },
      (error: HttpErrorResponse) => {
        this.snackbarService.snackbarSubject.next(error.message);
      }
    );
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: '',
      gender: AnimalGenderEnum.ALL,
      type: AnimalTypeEnum.ALL,
      breed: ''
    });
  }

  private copyArray(data: Animal[]): void {
    // Creating copy of initial array to compare with later
    this.initialArray = this.initialArray.concat(JSON.parse(JSON.stringify(data)));
  }

  private filterList(filters: FilterOptions): void {
    // Comparing array with initial values
    this.animals = this.initialArray.filter(item => this.filterFields(item, filters));
  }

  private filterFields(animalItem: Animal, filters: FilterOptions): boolean {
    // Filter function
    if (filters.type === AnimalTypeEnum.ALL && filters.gender === AnimalGenderEnum.ALL) {
      return animalItem.name.toUpperCase().includes(filters.name.toUpperCase()) ||
             animalItem.breed.toUpperCase().includes(filters.name.toUpperCase());
    }

    if (filters.gender === AnimalGenderEnum.ALL) {
      return (animalItem.name.toUpperCase().includes(filters.name.toUpperCase()) ||
              animalItem.breed.toUpperCase().includes(filters.name.toUpperCase())) && animalItem.type === filters.type;
    }

    if (filters.type === AnimalTypeEnum.ALL) {
      return (animalItem.name.toUpperCase().includes(filters.name.toUpperCase()) ||
              animalItem.breed.toUpperCase().includes(filters.name.toUpperCase())) && animalItem.gender === filters.gender;
    }

    return (animalItem.name.toUpperCase().includes(filters.name.toUpperCase()) ||
            animalItem.breed.toUpperCase().includes(filters.name.toUpperCase())) && animalItem.gender === filters.gender &&
           animalItem.type === filters.type;
  }

  private initFormChangeSubscriber(): void {
    // Detecting reactive form change to filter after
    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(filters => this.filterList(filters));
  }

  public goTo(animal: Animal): void {
    this.sharedService.changeObject(animal);
    this.router.navigate([`animals/${animal.id}`]);
  }

  public showMore(): void {
    this.page++;
    this.getAnimals();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
