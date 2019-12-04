import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AnimalsListComponent } from './animals/animals-list/animals-list.component';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { SnackbarService } from './shared/services/snackbar.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockedService: SnackbarService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AnimalsListComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'animals', component: AnimalsListComponent}]
        ),
        MatSnackBarModule,
        ReactiveFormsModule,
        AppMaterialModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockedService = TestBed.get(SnackbarService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  describe('integration tests', () => {
    it('testBed injection should work the same as injector', (() => {
      inject([SnackbarService], (injectable: SnackbarService) => {
        expect(injectable).toBe(mockedService);
      });
    }));

    it('component dependencies should be resolved by injector', async(() => {
      const service = fixture.debugElement.injector.get(SnackbarService);
      const ref = fixture.debugElement.injector.get(MatSnackBar);
      expect(service).toBeDefined();
      expect(ref).toBeDefined();
    }));

    it('base url should be loaded as well', async(() => {
      router.initialNavigation();
      expect(router.url).toBe('/');
    }));
  });
});
