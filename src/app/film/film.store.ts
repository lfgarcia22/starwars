// tslint:disable: no-non-null-assertion
import { Action, createAction, createReducer, on, props } from '@ngrx/store';
import { FilmModel } from './models/film.model';

interface FilmState {
  info?: FilmModel;
}

export const filmIS: FilmState = {};

const filmLabels = {
  SET_FILM: 'STARWARS_PLANET_SET_FILM'
};

export const filmActions = {
  setFilmAction: createAction(filmLabels.SET_FILM, props<FilmModel>())
};

const filmRegister = createReducer(filmIS,
  on(filmActions.setFilmAction, (state, info) => ({
    info
  }))
);

export function filmReducer(state: FilmState, action: Action): any {
  return filmRegister(state, action);
}
