import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnquiryDataService {

  private patientPrescriptions: Array<IPatientPrescription>;
  private baseUrl: string;

  constructor(private httpClient: HttpClient) { 

  }

  getEnquiryData(firstName, lastName, dateOfBirth){
    this.baseUrl = `http://localhost:3000/patients/enquiry/`;
    this.baseUrl += `${firstName}/${lastName}/${dateOfBirth}`;

    console.log(this.baseUrl);

    this.httpClient.get<Array<IPatientPrescription>>(this.baseUrl).subscribe((response) => {
      this.patientPrescriptions = response;
      console.log(this.patientPrescriptions);
    }, (error)=> {
      console.error("Error: Data didn't load");
    })
  }
}
