import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalsIndividualComponent } from './animals-individual/animals-individual.component';
import { AnimalsListComponent } from './animals-list/animals-list.component';

const routes: Routes = [
  {
    path: 'animals',
    component: AnimalsListComponent,
  },
  {
    path: 'animals/:id',
    component: AnimalsIndividualComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AnimalsRoutingModule {
}
