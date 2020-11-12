import { Component, OnInit } from '@angular/core';
import { PatientDataService } from '../services/patient-data.service';

@Component({
  selector: 'gh-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  constructor(private patientDataService: PatientDataService) { }

  ngOnInit() {
    this.patientDataService.getPatients();
  }

}
