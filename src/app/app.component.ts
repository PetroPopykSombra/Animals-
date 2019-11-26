import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackbarService } from './shared/services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor(
    private snackbar: MatSnackBar,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.snackbarSubscriber();
  }

  private snackbarSubscriber(): void {
    this.snackbarService.snackbarSubject
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (res: string) => {
        this.snackbar.open(res);
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
