import { Consultation } from './../../doctor-advice/interface/consultation';
import { ConsultationService } from './../../doctor-advice/service/consultation.service';
import { ChiefdoctorService } from './../../user/chiefdoctor.service';
import { GlucoseService } from './../../medi-data-repo/service/glucose.service';
import { CarbService } from './../../medi-data-repo/service/carb.service';
import { PatientService } from './../../user/patient.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/user/patient';
import { Glucose } from 'src/app/medi-data-repo/interface/glucose';
import { Carb } from 'src/app/medi-data-repo/interface/carb';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doctor } from 'src/app/user/doctor';

@Component({
  selector: 'app-doctor-data',
  templateUrl: './doctor-data.component.html',
  styleUrls: ['./doctor-data.component.scss']
})
export class DoctorDataComponent implements OnInit {


  doctorList:Doctor[];
  consultation_list: Consultation[];

  form: FormGroup;
  selectedDone = false;
  formDone = false;
  date: Date;
  doctorId: string;
  inactiveDoctors: Doctor[];

  constructor(private fb: FormBuilder, private chiefService: ChiefdoctorService, private patientService: PatientService, private consultationService: ConsultationService) { }

  ngOnInit(): void {
    this.form = this.fb.group(({
      start: ["",]
    }))
    this.getDoctors();
  }

  getDoctors(){
    this.chiefService.getAllDoctors().subscribe( data =>{
      this.doctorList=data;
    })
  }

  formSubmit(){
    this.formDone = true;
    this.date = this.form.get('start').value;
    this.getConsultation(this.doctorId, this.date);
    this.getInactiveDoctors(this.date);
  }
  

  selectedView(id: string){
    this.selectedDone = true;
    this.doctorId = id;
  }

  getConsultation(id: string, period: Date){
    this.consultation_list = [];
    this.consultationService.getConsulationsByDoctorId(id, period).subscribe(data =>{
      this.consultation_list = data;
      console.log(this.consultation_list);
    });
  }


  getInactiveDoctors(period: Date){
    this.chiefService.getInactiveDoctors(period).subscribe( data =>{
      this.inactiveDoctors = data;
    })

  }



}