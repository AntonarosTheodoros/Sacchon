import { LoginService } from './../log-in/login.service';
import { PatientService } from '../../user/patient.service';
  
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/user/patient';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form :FormGroup;

  id: string;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private user:PatientService, private loginService: LoginService) { }
  
  

  ngOnInit(): void {
  
        this.form = this.fb.group({
          username: ["",[Validators.required]],
          email: ['',  [Validators.required]],
          firstName: ["",[Validators.required]],
          lastName: ["",[Validators.required]],
          password: ['', [Validators.required]],
          repeatPassword: ['', [Validators.required]],
          address: ['',  [Validators.required]],
          age: ['',  [Validators.required]],
          sex: ['',  [Validators.required]]
        }) 
        

}

onClickSumbit(){
  
  const patient ={
    "id": 0,
    "username": this.form.get('username').value,
    "password":this.form.get('password').value,
    "email":this.form.get('email').value,
    "name": `${this.form.get('firstName').value} ${this.form.get('lastName').value}`,
    "address" : this.form.get('address').value,
    "age" : this.form.get('age').value,
    "sex" : this.form.get('sex').value,
    "dateRegistered": null
  }

  let newPatient:Patient = patient;

  this.user.signUpPatient(newPatient).subscribe(data =>{
    console.log(data.id);
    if (data.id != 0){
      this.loginService.authentication(data.username, data.password).subscribe(listResponse =>
        this.loginService.setSessionStorage(listResponse, this.form.get('username').value, this.form.get('password').value)
      )
    } else {
      alert("Username already exists!")
    }
  });

  //this.router.navigate([`patient/${this.idi}`]);

}

checkForm(){
  console.log(this.form.errors);
  console.log(this.form.pending);
}


}
