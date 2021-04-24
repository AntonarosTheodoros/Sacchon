import { ChiefdoctorService } from './../../user/chiefdoctor.service';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/user/doctor';
import { DoctorService } from 'src/app/user/doctor.service';
import { LoginService } from 'src/app/welcome-page/log-in/login.service';



@Component({
  selector: 'app-sign-up-chief',
  templateUrl: './sign-up-chief.component.html',
  styleUrls: ['./sign-up-chief.component.scss']
})
export class SignUpChiefComponent implements OnInit {

  form :FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private chiefdoctorService:ChiefdoctorService, private loginService: LoginService) { }
  

  ngOnInit(): void {
  
    this.form = this.fb.group({
      username: ["",[Validators.required]],
      email: ['',  [Validators.required]],
      firstName: ["",[Validators.required]],
      lastName: ["",[Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
      address: ['',  [Validators.required]]
    }) 
    

}


onClickSumbit(){
  
  const data ={
    "id": null,
    "username": this.form.get('username').value,
    "password":this.form.get('password').value,
    "email":this.form.get('email').value,
    "name": this.form.get('firstName').value,
    // ${this.form.get('lastName')}`,
    "address" : this.form.get('address').value
  }

  let doctor:Doctor = data;

  this.chiefdoctorService.signUpNewChiefDoctor(doctor).subscribe(data =>{
    if (data.id != null){
      this.router.navigate(['chief/home'])
      console.log("Signup doctor done")

    } else {
      alert("Registration failed!")
    }
  });


}






}
