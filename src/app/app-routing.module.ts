import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlanetComponent } from './planet/planet.component';

const routes: Routes = [
  { path: '', redirectTo: 'planets?page=1', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: 'planets', component: PlanetComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
