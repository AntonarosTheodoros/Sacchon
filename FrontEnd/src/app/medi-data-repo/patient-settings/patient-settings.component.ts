import { Router } from '@angular/router';
import { PatientService } from 'src/app/user/patient.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/user/patient';

@Component({
  selector: 'app-patient-settings',
  templateUrl: './patient-settings.component.html',
  styleUrls: ['./patient-settings.component.scss']
})
export class PatientSettingsComponent implements OnInit {
  patient: Patient;
 
  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    this.getPatient();
    
    // console.log(this.id);
  }

  getPatient(){
     let id = sessionStorage.getItem("id");
     console.log(id);
    this.patientService.getPatientById(id).subscribe(data =>{
     this.patient = data;
    console.log(this.patient.username)} );
  }


  removeAccount(){
    let id = sessionStorage.getItem("id");
    this.patientService.deletePatientById(id).subscribe();
    sessionStorage.clear();
    this.router.navigate(['home']);
  }
}
