import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { APP_ACTIONS, getUsersFailure, getUsersSuccess } from './app.actions';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(APP_ACTIONS.GET_USERS), // filtra las acciones que coinciden con el tipo de acción especificado
      mergeMap(() => // fusiona los observables devueltos por la función de proyección en un solo observable
        this.userService.getUsers().pipe(
          map((users) => {
            return getUsersSuccess({ users });
          })
        )
      ),
      catchError((error) => of(getUsersFailure({ error })))
    )
  );
}
