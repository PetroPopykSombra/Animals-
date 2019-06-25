import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Animal, AnimalGenderEnum, AnimalTypeEnum } from '../animals.model';
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

  private page: number;
  private initialArray = [] as Animal[];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private animalsService: AnimalsService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.page = 1;
    this.createForm();
    this.getAnimals();
    this.initFormChangeSubscriber();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getAnimals(): void {
    this.animalsService.getAnimals(this.page).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (data: Animal[]) => {
        this.copyArray(data);
        this.animals = this.animals.concat(data);
        this.filterList(this.form.value);
        if (data.length < 10) {
          this.isLastPage = true;
        }
      },
      (error: HttpErrorResponse) => {
        this.snackbar.open(error.message);
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
    this.initialArray = this.initialArray.concat(JSON.parse(JSON.stringify(data)));
  }

  private filterList(res): void {
    this.animals = this.initialArray.filter(item => this.filterFields(item, res));
  }

  private filterFields(animalItem: Animal, res): boolean {
    if (res.type === AnimalTypeEnum.ALL && res.gender === AnimalGenderEnum.ALL) {
      return animalItem.name.toUpperCase().includes(res.name.toUpperCase()) ||
             animalItem.breed.toUpperCase().includes(res.name.toUpperCase());
    }

    if (res.gender === AnimalGenderEnum.ALL) {
      return (animalItem.name.toUpperCase().includes(res.name.toUpperCase()) ||
              animalItem.breed.toUpperCase().includes(res.name.toUpperCase())) && animalItem.type === res.type;
    }

    if (res.type === AnimalTypeEnum.ALL) {
      return (animalItem.name.toUpperCase().includes(res.name.toUpperCase()) ||
              animalItem.breed.toUpperCase().includes(res.name.toUpperCase())) && animalItem.gender === res.gender;
    }

    return (animalItem.name.toUpperCase().includes(res.name.toUpperCase()) ||
            animalItem.breed.toUpperCase().includes(res.name.toUpperCase())) && animalItem.gender === res.gender && animalItem.type ===
           res.type;
  }

  private initFormChangeSubscriber(): void {
    this.form.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(res => this.filterList(res));
  }

  public goTo(id: number): void {
    this.router.navigate([`animals/${id}`]);
  }

  public showMore(): void {
    this.page++;
    this.getAnimals();
  }
}
