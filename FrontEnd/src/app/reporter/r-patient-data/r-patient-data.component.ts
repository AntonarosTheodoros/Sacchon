import { ChiefdoctorService } from './../../user/chiefdoctor.service';
import { GlucoseService } from './../../medi-data-repo/service/glucose.service';
import { CarbService } from './../../medi-data-repo/service/carb.service';
import { PatientService } from './../../user/patient.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/user/patient';
import { Glucose } from 'src/app/medi-data-repo/interface/glucose';
import { Carb } from 'src/app/medi-data-repo/interface/carb';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-r-patient-data',
  templateUrl: './r-patient-data.component.html',
  styleUrls: ['./r-patient-data.component.scss']
})
export class RPatientDataComponent implements OnInit {
  patientsList: Patient[];
  glucose_list: Glucose[];
  carb_list: Carb[];
  form: FormGroup;
  selectedDone = false;
  formDone = false;
  date: Date;
  patientId: string;
  inactivePatients: Patient[];

  constructor(private fb: FormBuilder, private chiefService: ChiefdoctorService, private patientService: PatientService, private carbService: CarbService, private glucoseService: GlucoseService) { }

  ngOnInit(): void {
    this.form = this.fb.group(({
      start: ["",]
    }))


    this.getPatients();
   
    
   
  }

  formSubmit(){
    this.formDone = true;
    this.date = this.form.get('start').value;
    this.getGlucose(this.patientId, this.date);
    this.getCarb(this.patientId, this.date);
    this.getInactivePatients(this.date);
  }
  

  getPatients(){
    this.patientsList = [];
    this.patientService.getPatients().subscribe(data => {
      this.patientsList = data;

    })
  }

  
  getPatientsFromDate(){
    this.patientsList = [];
    this.patientService.getPatients().subscribe(data => {
      this.patientsList = data;

    })
  }

  selectedView(id: string){
    this.selectedDone = true;
    this.patientId = id;
  }

  getGlucose(id: string, period: Date){
    this.glucose_list = [];
    this.glucoseService.getGlucoseByPatientId(id, period).subscribe(data =>{
      this.glucose_list = data;
      console.log(this.glucose_list);
    });
  }

  getCarb(id: string, period: Date){
    this.carb_list = [];
    this.carbService.getCarbByPatientId(id, period).subscribe(data=>{
      this.carb_list = data;
      console.log(this.carb_list);
    });
  }

  getInactivePatients(period: Date){
    this.chiefService.getInactivePatients(period).subscribe( data =>{
      this.inactivePatients = data;
    })

  }



}
