import { BaseUrlService } from './../base-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

  //private readonly baseUrl = 'http://ec2-18-185-114-173.eu-central-1.compute.amazonaws.com/v1'
  // private readonly baseUrl = 'http://localhost:9000/v1'
  private readonly baseUrl = this.baseUrlService.getBaseUrl();


  addPatient(user: User): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}/patient`, user.email, 
     {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    )
  }

  addChiefDoctor(user: User): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}/chiefDoctor`, user.email, 
     {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    )
  }


  deletePatient(){
    return this.http.delete(
      `${this.baseUrl}/patient/`,
      {headers:new HttpHeaders(
        {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
        )
      })
  }

  

}
