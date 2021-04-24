import { Consultation } from './../interface/consultation';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Carb } from 'src/app/medi-data-repo/interface/carb';
import { Glucose } from 'src/app/medi-data-repo/interface/glucose';
import { DoctorService } from 'src/app/user/doctor.service';
import { Patient } from 'src/app/user/patient';


@Component({
  selector: 'app-da-search',
  templateUrl: './da-search.component.html',
  styleUrls: ['./da-search.component.scss']
})
export class DaSearchComponent implements OnInit {
  patients: Patient[];
  carbs: Carb[];
  glucoses: Glucose[];


  selectedConsult = false;
  selectedView = false;

  consultation: Consultation;
  patientId: string;
  form: FormGroup;
  

  constructor(private doctorService: DoctorService, private fb:FormBuilder){}

  ngOnInit(): void {
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
    this.doctorService.getUnconsultedPatientsbyDoctorId(id).subscribe(data =>{
      this.patients = data;
    })

  }
  
  selectConsultPatient(id: string){
    this.selectedConsult = true;
    this.patientId = id;
  }

  selectViewRecords(id: string){
    this.selectedView =true;
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
  }

  onClickSubmitInsertCard(){

    const cons ={
      "id": 0,
      "medicationName":  this.form.get('medicationName').value,
      "dosage": this.form.get('dosage').value,
      "comment":  this.form.get('comment').value,
      "date": new Date(),
      "doctorId": sessionStorage.getItem("id"),
      "patientId": `${this.patientId}`
    }

    console.log(sessionStorage.getItem("id"));
    // let dosage = this.form.get('dosage').value;
    // let medicationName = this.form.get('medicationName').value;
    // let comment = this.form.get('comment').value;

    // this.consultation.dosage = dosage;
    // this.consultation.medicationName = medicationName;
    // this.consultation.comment = comment;
    // this.consultation.consultationDate = new Date();
    // this.consultation.doctor_id = sessionStorage.getItem("id");
  
    this.doctorService.insertConsultationByPatientId(this.patientId, cons)
      .subscribe(data => {console.log(data);
        this.selectedConsult = false;
      });
  }


}
