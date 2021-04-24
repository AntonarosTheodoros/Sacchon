import { FormGroup, FormBuilder } from '@angular/forms';
import { ConsultationService } from './../service/consultation.service';
import { DoctorService } from 'src/app/user/doctor.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/user/patient';
import { Carb } from 'src/app/medi-data-repo/interface/carb';
import { Glucose } from 'src/app/medi-data-repo/interface/glucose';
import { Consultation } from '../interface/consultation';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.scss']
})
export class MyPatientsComponent implements OnInit {
  patients: Patient[];
  carbs: Carb[];
  glucoses: Glucose[];
  consultations: Consultation[];

  selectedOne = false;
  selectedConsultation = false;

  consultation: Consultation;
  patientId: string;
  form: FormGroup;
  

  constructor(private doctorService: DoctorService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.selectedConsultation = false;
    this.getPatients();
    this.form = this.fb.group({
      medicationName: ["",],
      dosage: ["",],
      comment: ["",]
    });

  }

  getPatients(){
    this.patients = [];
    let id = sessionStorage.getItem("id");
    console.log("credentials")
    console.log(sessionStorage.getItem("credentials"))
    this.doctorService.getPatientsbyDoctorId(id).subscribe(data =>{
      this.patients = data;
    })
  }

  selectPatient(id: string){
    this.selectedOne = true;
    this.patientId = id;

    this.carbs = [];
    this.doctorService.getCarbsByPatientId(id).subscribe(data=>{
      this.carbs = data;
    })

    this.glucoses = [];
    this.doctorService.getGlucosesByPatientId(id).subscribe( data =>{
      this.glucoses = data;
      console.log(data)
    })

    this.consultations = [];
    this.doctorService.getConsultationsByPatientId(id).subscribe( data =>{
      this.consultations = data;
      console.log(data)
    })
  }

  selectConsultation(consultation: Consultation){
    this.selectedConsultation = true;
    this.consultation = consultation;
  }

  onClickSubmitEditCard(){

    let dosage = this.form.get('dosage').value;
    let medicationName = this.form.get('medicationName').value;
    let comment = this.form.get('comment').value;

    this.consultation.dosage = dosage;
    this.consultation.medicationName = medicationName;
    this.consultation.comment = comment;
  
    this.doctorService.editConsultationByPatientId(this.patientId, this.consultation)
      .subscribe(data => {console.log(data);
        this.selectedConsultation = false;
      });
  }

}

