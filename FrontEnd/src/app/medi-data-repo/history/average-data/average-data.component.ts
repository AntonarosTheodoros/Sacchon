import { StartEndDate } from './../../interface/start-end-date';
import { GlucoseService } from './../../service/glucose.service';
import { CarbService } from './../../service/carb.service';
import { Carb } from './../../interface/carb';
import { Component, OnInit } from '@angular/core';
import { Glucose } from '../../interface/glucose';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-average-data',
  templateUrl: './average-data.component.html',
  styleUrls: ['./average-data.component.scss']
})
export class AverageDataComponent implements OnInit {
  form: FormGroup;
  averageGlucose: Glucose;
  averageCarb: number;
  dates: StartEndDate;

  isShow = false;

  constructor(private fb:FormBuilder, private carbService: CarbService, private glucoseService: GlucoseService ) { }

  
  ngOnInit(): void {
    this.form = this.fb.group({
      start: ["",],
      end: ["",]
    });

  }


  onClick(){
    this.form = new FormGroup({
      fromDate: new FormControl("", [Validators.required]),
      untilDate: new FormControl("", [Validators.required])
    });
    this.isShow = false;
  }
  
  formSumbit(){
    let dates:StartEndDate = this.form.value;
    this.isShow = true;
 
    this.carbService.getAverageCarb(dates.start, dates.end)
    .subscribe(avg=> {this.averageCarb = avg;}
      );


      this.glucoseService.getAverageGlucose(dates.start, dates.end)
      .subscribe(avg=> {this.averageGlucose= avg;});
  }



}

