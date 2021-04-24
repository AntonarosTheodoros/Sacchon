import { BaseUrlService } from './../../base-url.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class LoginService {


  params = new HttpParams();
  responseOfAuth = new Subject<boolean>();
  private readonly baseUrl = this.baseUrlService.getBaseUrl();

  constructor(private http:HttpClient, private router: Router, private baseUrlService:BaseUrlService) { }

  authentication(username:string, password:string):Observable<number[]>{
    return this.http.get<number[]>(
      `${this.baseUrl}/login?username=${username}&&password=${password}`
    )
  }


  // Το Do: Add name to sessionStorage

  setSessionStorage(listResponse: number[], username: string, password: string){
    console.log(sessionStorage.getItem("credentials"))

    if(listResponse[0] == 1){

      sessionStorage.setItem("credentials",username + ":" + password);
      sessionStorage.setItem("id", `${listResponse[1]}`);
      sessionStorage.setItem('notification', `${listResponse[2]}`);
      sessionStorage.setItem("role", `${listResponse[0]}`);

      this.router.navigate(['patient/home'])


    } else if (listResponse[0] == 2){

      
      sessionStorage.setItem("credentials",username + ":" + password);
      sessionStorage.setItem("id", `${listResponse[1]}`);
      sessionStorage.setItem('notification', `${listResponse[2]}`);
      sessionStorage.setItem("role", `${listResponse[0]}`);
      console.log(sessionStorage.getItem("credentials"))

      this.router.navigate(['doctor/home'])

    } else if(listResponse[0] == 3){

      sessionStorage.setItem("id", `${listResponse[1]}`);
      sessionStorage.setItem('notification', `${listResponse[2]}`);
      sessionStorage.setItem("role", `${listResponse[0]}`);

      this.router.navigate(['chiefdoctor/home'])

    } else{
      alert("Wrong username or password");
    }

  }


  }

