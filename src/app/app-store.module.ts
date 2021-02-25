import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { planetReducer } from './planet/planet.store';

@NgModule({
  imports: [
    StoreModule.forRoot({
      planet: planetReducer
    }, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    })
  ]
})
export class AppStoreModule { }
