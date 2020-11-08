import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms' ;

import { AppComponent } from './app.component';
import { PatientsComponent } from './patients/patients.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { DrugsComponent } from './drugs/drugs.component';
import { PatientsPrescriptionsComponent } from './patients-prescriptions/patients-prescriptions.component';
import { EnquiryComponent } from './enquiry/enquiry.component';


@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    NavigatorComponent,
    DrugsComponent,
    PatientsPrescriptionsComponent,
    EnquiryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
