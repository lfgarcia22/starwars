import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store.module';
import { AppComponent } from './app.component';
import { TablePaginationComponent } from './commons/table-pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    TablePaginationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AppStoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
