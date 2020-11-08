import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrugsComponent } from './drugs/drugs.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { PatientsPrescriptionsComponent } from './patients-prescriptions/patients-prescriptions.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
  { path: 'patients', component: PatientsComponent},
  { path: 'patients/prescriptions', component: PatientsPrescriptionsComponent},
  { path: 'patients/enquiry', component: EnquiryComponent},

  { path: 'drugs', component: DrugsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }