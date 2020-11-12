import { Component, OnInit } from '@angular/core';
import { EnquiryDataService } from '../services/enquiry-data.service';

@Component({
  selector: 'gh-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {

  private name: string;
  private dob: Date;

  constructor(private enquiryDataService: EnquiryDataService) { }

  ngOnInit() {
  }

  fetchPrescriptions() {
    this.enquiryDataService.getEnquiryData(this.name.split(" ")[0], this.name.split(" ")[1], this.dob);
  }
}
