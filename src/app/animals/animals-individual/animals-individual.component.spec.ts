import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { from } from 'rxjs';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';

import { AnimalsIndividualComponent } from './animals-individual.component';

describe('AnimalsIndividualComponent', () => {
  let component: AnimalsIndividualComponent;
  let fixture: ComponentFixture<AnimalsIndividualComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalsIndividualComponent ],
      imports: [
        SwiperModule,
        AppMaterialModule,
        HttpClientModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: { params: from([{id: 1}])}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalsIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//  it('should create', () => {
//    expect(component).toBeTruthy();
//  });
});
