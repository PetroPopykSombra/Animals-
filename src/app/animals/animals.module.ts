import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { AnimalsListComponent } from './animals-list/animals-list.component';
import { AnimalsRoutingModule } from './animals.routing.module';
import { AnimalsIndividualComponent } from './animals-individual/animals-individual.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    AnimalsRoutingModule
  ],
  declarations: [
    AnimalsListComponent,
    AnimalsIndividualComponent
  ],
  exports: []
})
export class AnimalsModule {
}
