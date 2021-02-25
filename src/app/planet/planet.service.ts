import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppUtils } from '../commons/app.utils';
import { PlanetWrapperModel } from './models/planet-wrapper.model';
import { PlanetModel } from './models/planet.model';
import { planetActions } from './planet.store';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(
    protected store: Store<any>,
    protected httpClient: HttpClient
  ) { }

  getPlanets = (): Observable<PlanetWrapperModel> =>
    this.store.select('planet')

  getPlanetInfo = (): Observable<PlanetModel> =>
    this.store.select('planet', 'info')

  readPlanets = (page: string = '1'): Observable<PlanetWrapperModel> =>
    this.httpClient.get<PlanetWrapperModel>(`${AppUtils.BASE_PATH}/planets/`, {
      params: {
        page
      }
    }).pipe(
      tap(res => this.store.dispatch(planetActions.setResultAction(res)))
    )

  sortInformation = (property: string, direction: string) =>
    this.store.dispatch(planetActions.sortResultAction({ property, direction: direction === 'asc' ? 1 : -1 }))

  loadPlanetInfo = (planet: PlanetModel = {}) =>
    this.store.dispatch(planetActions.setInfoAction(planet))

}
