import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  listResponse:number[];
  form:FormGroup;
  constructor(private fb:FormBuilder,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["",Validators.minLength(1)],
      password: ["",Validators.minLength(1)]

    })

  }

  nav(){
    this.router.navigate(['doctor/home']);
  }

  logIn(){
    let username: string;
    let password: string;


    username = this.form.get("username").value;
    password = this.form.get("password").value;


    
    this.listResponse = [];
    
    this.loginService.authentication(username, password).subscribe(data =>{
      
      this.listResponse = data;
      console.log(data);
      console.log(this.listResponse)

      sessionStorage.setItem("id", `${this.listResponse[1]}`);
      sessionStorage.setItem("role", `${this.listResponse[0]}`);
      sessionStorage.setItem("credentials",username + ":" + password);
      sessionStorage.setItem('notification', `${this.listResponse[2]}`);
      sessionStorage.setItem("username",username);
    
    if(this.listResponse[0] == 1){
      username = this.form.get('username').value;
      password = this.form.get('password').value;
      sessionStorage.setItem('notification', `${this.listResponse[2]}`);
      
      this.router.navigate(['patient/home'])

    } else if (this.listResponse[0] == 2){
      username = this.form.get('username').value;
      password = this.form.get('password').value;
    
      this.router.navigate(['doctor/home'])

    } else if(this.listResponse[0] == 3){
      username = this.form.get('username').value;
      password = this.form.get('password').value;

      console.log("HERE")
      console.log(sessionStorage.getItem("credentials"))
  

      this.router.navigate(['chief/home'])

    } else{
      alert("Wrong username or password");
    }

  }
      
  );
  }


  checkRole(){
    
  }

}
