import { CarbService } from './../service/carb.service';
import { Component, OnInit } from '@angular/core';
import { Glucose } from '../interface/glucose';
import { GlucoseService } from '../service/glucose.service';
import { Carb } from '../interface/carb';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  form:FormGroup;
  formGlucose: FormGroup;
  
  constructor(private fb:FormBuilder, private router : Router,private glucoseService:GlucoseService, private carbService:CarbService) { }

  glucose_list:Glucose[];
  carb_list: Carb[];

  old_carb: Carb;
  glucoseItem: Glucose;

  carbId: number;
  glucoseId: number;

  carbValue: number;

  editFormGlucoseShow = false;
  editFormShow = false;

  ngOnInit(): void {
    this.editFormShow = false;
    this. editFormGlucoseShow = false;

    this.updateGlucose();
    this.updateCarb();

    this.form = this.fb.group({
      carb: ["",]
    });

    this.formGlucose = this.fb.group({
      glucose: ["",]
    });
  }

  updateGlucose(){
    this.glucose_list = [];
    this.glucoseService.getGlucose().subscribe(data =>{
      this.glucose_list = data;
      console.log(this.glucose_list);
    });
  }

  updateAfterEditCarb(){
    this.carb_list.filter(carb => carb.id != this.carbId); 
  }

  updateAfterEditGlucose(){
    this.glucose_list.filter(glucose => glucose.id != this.glucoseId); 
  }
  updateCarb(){
    this.carb_list = [];
    this.carbService.getCarb().subscribe(data=>{
      this.carb_list = data;
      console.log(this.carb_list);
    });
  }

  editClickCarb(id: number){
    this.carbId =id;
    this.editFormShow = true;
  }

  editClickGlucose(id: number){
    console.log(id)
    this.glucoseId = id;
    this.editFormGlucoseShow = true;
  }

  deleteClickCarb(id: number){
    this.carbService.deleteCarb(id)
    .subscribe(data => {console.log(data);
              // this.updateAfterEditCarb();
              this.updateCarb();
                  
    });
  }

  deleteClickGlucose(id: number){
    this.glucoseService.deleteGlucose(id)
    .subscribe(data => {console.log(data);
      this.updateGlucose();
      // this.updateAfterEditGlucose();
    });
  }


  onClickSubmitEditCard(){
    let value:number = this.form.get('carb').value;

    this.old_carb = this.carb_list.find(carb => carb.id === this.carbId); 
    this.old_carb.carb = value;

    this.carbService.editCarb(this.old_carb)
      .subscribe(data => {console.log(data);
            this.editFormGlucoseShow = false;
            // this.updateAfterEditCarb();
                //this.ngOnInit();
      });

  }

  
  onClickSubmitGlucoseEditCard(){
    let value:number = this.formGlucose.get('glucose').value;
    console.log(value)

    this.glucoseItem = this.glucose_list.find(glucose => glucose.id === this.glucoseId); 
    this.glucoseItem.glucose = value;

    this.glucoseService.editGlucose(this.glucoseItem)
      .subscribe(data => {console.log(data);
                this.ngOnInit();
      });

      this.form.reset();
  }

  
}
