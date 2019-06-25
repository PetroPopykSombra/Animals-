import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsIndividualComponent } from './animals-individual.component';

describe('AnimalsIndividualComponent', () => {
  let component: AnimalsIndividualComponent;
  let fixture: ComponentFixture<AnimalsIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalsIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalsIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
