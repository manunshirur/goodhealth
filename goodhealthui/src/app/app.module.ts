import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PatientsComponent } from './patients/patients.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { DrugsComponent } from './drugs/drugs.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    NavigatorComponent,
    DrugsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
