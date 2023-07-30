import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUsers } from '../store/app.actions';
import { IUser } from '../core/interfaces/user.interface';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  users$: Observable<IUser[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(getUsers());
  }

  ngOnDestroy() {}
}
