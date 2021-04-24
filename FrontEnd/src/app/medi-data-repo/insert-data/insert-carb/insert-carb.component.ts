import { CarbService } from '../../service/carb.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Carb } from '../../interface/carb';

@Component({
  selector: 'app-insert-carb',
  templateUrl: './insert-carb.component.html',
  styleUrls: ['./insert-carb.component.scss']
})
export class InsertCarbComponent implements OnInit {

  form:FormGroup;
  form2: FormGroup;
  constructor(private fb:FormBuilder,private carbService:CarbService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      carb: ["",],
      date: ["",]
    });

    this.form2 = this.fb.group({
      date: ["",]
    })
  }

  onClickSubmit(){
    let carb:Carb = this.form.value;
    this.carbService.addCarb(carb).subscribe(data =>{
      console.log(data)
    })

    this.form.reset();
  }


}
