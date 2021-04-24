import { GlucoseService } from '../../service/glucose.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Glucose } from '../../interface/glucose';
@Component({
  selector: 'app-insert-glucose',
  templateUrl: './insert-glucose.component.html',
  styleUrls: ['./insert-glucose.component.scss']
})
export class InsertGlucoseComponent implements OnInit {


  form:FormGroup;
  constructor(private fb:FormBuilder,private glucoseService:GlucoseService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      glucose: ["",],
      date: ["",]
    })
  }

  onClickSubmit(){
    let glucose:Glucose = this.form.value;
    this.glucoseService.addGlucose(glucose).subscribe(data =>{
      console.log(data)
    })

    this.form.reset();
  }

}
