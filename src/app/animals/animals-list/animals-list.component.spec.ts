import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { AnimalsIndividualComponent } from '../animals-individual/animals-individual.component';
import { Animal, AnimalGenderEnum, AnimalTypeEnum } from '../animals.model';

import { AnimalsListComponent } from './animals-list.component';

describe('AnimalsListComponent', () => {
  let component: AnimalsListComponent;
  let fixture: ComponentFixture<AnimalsListComponent>;
  const mockedData = [
    new Animal('name', AnimalTypeEnum.CAT, AnimalGenderEnum.FEMALE, 'description', 'notes', [], '1', 'breed', '555', false)
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [
            {path: 'animals', component: AnimalsListComponent},
            {path: 'animals:id', component: AnimalsIndividualComponent}
          ]
        ),
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        SwiperModule,
        HttpClientTestingModule
      ],
      declarations: [
        AnimalsListComponent,
        AnimalsIndividualComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('integration tests', () => {
    it('animals list container should be defined on UI', (() => {
      const element: DebugElement = fixture.debugElement.query(By.css('.animals-list'));
      expect(element).toBeDefined();
    }));

    it('details-btn should navigate to details page', (() => {
      spyOn(component.router, 'navigate');
      component.animals = mockedData;
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('.details-btn')).nativeElement;
      btn.click();
      expect(component.router.navigate).toHaveBeenCalledWith(['animals/555']);
    }));

    it('animals-list--btn should load more data and display all correct', (() => {
      component.animals = [];
      component.animals.length = 10;
      component.animals.fill(new Animal('name', AnimalTypeEnum.CAT, AnimalGenderEnum.FEMALE, '1', '1', [], '1', '1', '555', false));
      fixture.detectChanges();
      const elementsArray = fixture.debugElement.queryAll(By.css('.animals-list--grid__img'));
      expect(elementsArray.length).toEqual(10);
      spyOn(component, 'showMore');
      const btn = fixture.debugElement.query(By.css('.animals-list--btn')).nativeElement;
      btn.click();
      expect(component.showMore).toHaveBeenCalled();
    }));

    it('no-results should be shown if no data is loaded', (() => {
      component.animals = [];
      fixture.detectChanges();
      const noResultsElement = fixture.debugElement.queryAll(By.css('.no-results'));
      expect(noResultsElement).toBeDefined();
    }));
  });

  describe('ens-to-end flow', () => {
    it('user flow', (() => {
      component.animals = mockedData;
      fixture.detectChanges();
      const listElement: DebugElement = fixture.debugElement.query(By.css('.animals-list'));
      expect(listElement).toBeDefined();
      spyOn(component.router, 'navigate');
      const btnDetails = fixture.debugElement.query(By.css('.details-btn')).nativeElement;
      btnDetails.click();
      expect(component.router.navigate).toHaveBeenCalledWith(['animals/555']);
      const fixture1 = TestBed.createComponent(AnimalsIndividualComponent);
      fixture1.detectChanges();
      const individualBlock = fixture1.debugElement.query(By.css('.animals-individual'));
      expect(individualBlock).toBeDefined();
      const animalBreed = fixture1.debugElement.query(By.css('.animal__breed')).nativeElement;
      expect(animalBreed.textContent).toContain('breed');
      const animalGender = fixture1.debugElement.query(By.css('.animal__gender')).nativeElement;
      expect(animalGender.textContent).toContain('FEMALE');
      const animalDescription = fixture1.debugElement.query(By.css('.animal__description')).nativeElement;
      expect(animalDescription.textContent).toContain('description');
      const animalMedicalNotes = fixture1.debugElement.query(By.css('.animal__medicalNotes')).nativeElement;
      expect(animalMedicalNotes.textContent).toContain('notes');
      const adoptBtn = fixture1.debugElement.query(By.css('button[mat-raised-button]')).nativeElement;
      spyOn(fixture1.componentInstance, 'adoptAnimal');
      spyOn(fixture1.componentInstance.snackbarService.snackbarSubject, 'next');
      adoptBtn.click();
      expect(fixture1.componentInstance.adoptAnimal).toHaveBeenCalled();
      fixture1.componentInstance.animalsService.adoptAnimal(fixture1.componentInstance.animal).subscribe(
        () => {
          expect(fixture1.componentInstance.snackbarService.snackbarSubject.next).toHaveBeenCalledWith('You have adopted this animal!');
        }
      );
    }));
  });
});
