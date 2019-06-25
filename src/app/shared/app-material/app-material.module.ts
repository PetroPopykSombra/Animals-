import { NgModule } from '@angular/core';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatButtonModule, MatCardModule,
  MatFormFieldModule, MatGridListModule,
  MatInputModule,
  MatRadioModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}
  ]
})
export class AppMaterialModule {
}
