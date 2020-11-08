import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientPrescriptionDataService {

  private patientPrescriptions: Array<IPatientPrescription>;

  constructor(private httpClient: HttpClient) { 

  }

  getPatientsPrescriptions(){
    this.httpClient.get<Array<IPatientPrescription>>("http://localhost:3000/patients/prescriptions").subscribe((response) => {
      this.patientPrescriptions = response;
      console.log(this.patientPrescriptions);
    }, (error)=> {
      console.error("Error: Data didn't load");
    })
  }
}
