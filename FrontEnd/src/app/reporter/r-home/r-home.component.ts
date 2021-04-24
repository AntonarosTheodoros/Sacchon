import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarbService } from 'src/app/medi-data-repo/service/carb.service';
import { ChiefdoctorService } from 'src/app/user/chiefdoctor.service';
import { Doctor } from 'src/app/user/doctor';
import { Patient } from 'src/app/user/patient';
import { PatientService } from 'src/app/user/patient.service';

@Component({
  selector: 'app-r-home',
  templateUrl: './r-home.component.html',
  styleUrls: ['./r-home.component.scss']
})
export class RHomeComponent implements OnInit {
  inactiveDoctors: Doctor[];
  form: FormGroup;
  selectedDone = false;
  formDone = false;
  date: Date;

  inactivePatients: Patient[];

  constructor(private fb: FormBuilder, private chiefService: ChiefdoctorService, private patientService: PatientService) { }

  ngOnInit(): void {
    this.form = this.fb.group(({
      start: ["",]
    }))
   
  }

  formSubmit(){
    this.formDone = true;
    this.date = this.form.get('start').value;
  
    this.getInactivePatients(this.date);
    this.getInactiveDoctors(this.date);
  }


  selectedView(id: string){
    this.selectedDone = true;
  }


  getInactivePatients(period: Date){
    this.chiefService.getInactivePatients(period).subscribe( data =>{
      this.inactivePatients = data;
    })
  }

  
  getInactiveDoctors(period: Date){
    this.chiefService.getInactiveDoctors(period).subscribe( data =>{
      this.inactiveDoctors = data;
    })
  }




}
