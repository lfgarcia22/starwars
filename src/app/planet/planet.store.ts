// tslint:disable: no-non-null-assertion
import { Action, createAction, createReducer, on, props } from '@ngrx/store';
import { PlanetWrapperModel } from './models/planet-wrapper.model';
import { PlanetModel } from './models/planet.model';

interface PlanetState extends PlanetWrapperModel {
  info?: PlanetModel;
}

export const planetIS: PlanetState = {
  count: 0,
  results: []
};

const planetLabels = {
  SET_DEFAULT: 'STARWARS_PLANET_SET_DEFAULT',
  SET_RESULT: 'STARWARS_PLANET_SET_RESULT',
  SORT_RESULT: 'STARWARS_PLANET_SORT_RESULT',
  SET_INFO_RESULT: 'STARWARS_PLANET_SET_INFO_RESULT'
};

export const planetActions = {
  setDefaultAction: createAction(planetLabels.SET_DEFAULT, props<{ default: boolean }>()),
  setResultAction: createAction(planetLabels.SET_RESULT, props<PlanetWrapperModel>()),
  sortResultAction: createAction(planetLabels.SORT_RESULT, props<{ property: string, direction: number }>()),
  setInfoAction: createAction(planetLabels.SET_INFO_RESULT, props<PlanetModel>())
};

const planetRegister = createReducer(planetIS,
  on(planetActions.setDefaultAction, () => planetIS),

  on(planetActions.setResultAction, (state, wrapper) => ({
    ...state,
    ...wrapper,
    results: wrapper.results?.map(res => {
      res.created = new Date(`${res.created}`);
      res.edited = new Date(`${res.edited}`);
      res.diameter = res.diameter === 'unknown' ? '' : +res.diameter!;
      res.orbital_period = res.orbital_period === 'unknown' ? '' : +res.orbital_period!;
      res.population = res.population === 'unknown' ? '' : +res.population!;
      res.rotation_period = res.rotation_period === 'unknown' ? '' : +res.rotation_period!;
      res.surface_water = res.surface_water === 'unknown' ? '' : +res.surface_water!;
      return res;
    })
  })),

  on(planetActions.sortResultAction, (state, { property, direction }) => ({
    ...state,
    results: state.results?.sort((a: any, b: any) =>
      a[property] > b[property]
        ? direction
        : a[property] < b[property]
          ? direction * -1
          : 0
    )
  })),

  on(planetActions.setInfoAction, (state, info) => ({
    ...state,
    info
  }))
);

export function planetReducer(state: PlanetWrapperModel, action: Action): any {
  return planetRegister(state, action);
}
