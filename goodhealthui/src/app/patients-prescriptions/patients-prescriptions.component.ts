import { Component, OnInit } from '@angular/core';
import { PatientPrescriptionDataService } from '../services/patient-prescription-data.service';

@Component({
  selector: 'gh-patients-prescriptions',
  templateUrl: './patients-prescriptions.component.html',
  styleUrls: ['./patients-prescriptions.component.css']
})
export class PatientsPrescriptionsComponent implements OnInit {

  constructor(private patientsPrescriptionDataService: PatientPrescriptionDataService) { }

  ngOnInit() {
    this.patientsPrescriptionDataService.getPatientsPrescriptions();
  }

}
