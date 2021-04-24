import { PatientService } from 'src/app/user/patient.service';
import { Router } from '@angular/router';
import { CarbService } from './../service/carb.service';
import { Component, OnInit } from '@angular/core';
import { Carb } from '../interface/carb';
import { Patient } from 'src/app/user/patient';
import { ConsultationService } from 'src/app/doctor-advice/service/consultation.service';
import { Consultation } from 'src/app/doctor-advice/interface/consultation';

@Component({
  selector: 'app-mdr-home',
  templateUrl: './mdr-home.component.html',
  styleUrls: ['./mdr-home.component.scss']
})
export class MdrHomeComponent implements OnInit {

  name: string;

  constructor(private consService:ConsultationService, private carbService: CarbService, private router:Router, private patientService: PatientService) { }
  notification:string;

  current_consultation: Consultation;

  ngOnInit(): void {
    this.notification = sessionStorage.getItem("notification");
    this.name = sessionStorage.getItem("username")
    this.getConsultations();

  }
  getConsultations(){

    let id = sessionStorage.getItem("id");
    console.log(id);
    this.consService.getPatientConsultations(id).subscribe(data =>{
      this.current_consultation = data[0];}
    )

  }

  onClickUpdate(){
    sessionStorage.setItem("notification", "0");
    this.notification = "0";
  }
  onClickView(){
    this.router.navigate(['patient/consultations']);
  }


}


