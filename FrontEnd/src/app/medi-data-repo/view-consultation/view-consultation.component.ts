import { ConsultationService } from './../../doctor-advice/service/consultation.service';
import { Consultation } from './../../doctor-advice/interface/consultation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-consultation',
  templateUrl: './view-consultation.component.html',
  styleUrls: ['./view-consultation.component.scss']
})
export class ViewConsultationComponent implements OnInit {
  consultation_list: Consultation[];
  current_consultation: Consultation;

  constructor(private consService:ConsultationService) { }

  ngOnInit(): void {
    this.getConsultations();
  }

  getConsultations(){
    this.consultation_list = [];
    let id = sessionStorage.getItem("id");
    console.log(id);
    this.consService.getPatientConsultations(id).subscribe(data =>{
      this.consultation_list = data;
      this.current_consultation = data[0];}
    )

  }

}
