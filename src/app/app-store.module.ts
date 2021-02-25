import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    StoreModule.forRoot({
    }, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    })
  ]
})
export class AppStoreModule { }
