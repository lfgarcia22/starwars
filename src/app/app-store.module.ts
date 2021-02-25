import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { filmReducer } from './film/film.store';
import { planetReducer } from './planet/planet.store';

@NgModule({
  imports: [
    StoreModule.forRoot({
      planet: planetReducer,
      film: filmReducer
    }, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    })
  ]
})
export class AppStoreModule { }
