import { Consultation } from './../interface/consultation';
import { ConsultationService } from './../service/consultation.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-insert-consultation',
  templateUrl: './insert-consultation.component.html',
  styleUrls: ['./insert-consultation.component.scss']
})
export class InsertConsultationComponent implements OnInit {

  form:FormGroup;
  constructor(private fb:FormBuilder,private consultationService:ConsultationService) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      medicationName: ["",],
      dosage: ["",],
      comment: ["",]
    })
  }

  onClickSubmit(){
    let consultation:Consultation = this.form.value;
    this.consultationService.addConsultation(consultation).subscribe(data =>{
      console.log(data)
    })
  }

}
