import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppUtils } from '../commons/app.utils';
import { filmActions } from './film.store';
import { FilmModel } from './models/film.model';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(
    protected store: Store<any>,
    protected httpClient: HttpClient
  ) { }

  getFilmInfo = (): Observable<FilmModel> =>
    this.store.select('film', 'info')

  readFilm = (film: string = '1'): Observable<FilmModel> =>
    this.httpClient.get<FilmModel>(`${AppUtils.BASE_PATH}/films/${film}/`).pipe(
      tap(res => this.store.dispatch(filmActions.setFilmAction(res)))
    )

}
