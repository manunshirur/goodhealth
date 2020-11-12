import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {

  private patients: Array<IPatient>;

  constructor(private httpClient: HttpClient) { 

  }

  getPatients(){
    this.httpClient.get<Array<IPatient>>("http://localhost:3000/patients").subscribe((response) => {
      this.patients = response;
      console.log(this.patients);
    }, (error)=> {
      console.error("Error: Data didn't load");
    })
  }
}
