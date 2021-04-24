import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Carb } from '../../interface/carb';
import { CarbService } from '../../service/carb.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

 
  form:FormGroup;
  
  constructor(private fb:FormBuilder,private carbService:CarbService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      carb: ["",]
    });

  }

  onClickSubmit(){
    let carb:Carb = this.form.value;
    this.carbService.addCarb(carb).subscribe(data =>{
      console.log(data)
    })
  }
}
