import { BaseUrlService } from './../base-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Patient } from './patient';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly baseUrl = this.baseUrlService.getBaseUrl();

  constructor(private http:HttpClient, private baseUrlService: BaseUrlService) { }

  signUpPatient(patient: Patient): Observable<Patient> {
 
    return this.http.post<Patient>(
      `${this.baseUrl}/register`, patient, 
      {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    
    )
  }

  getPatients(): Observable<Patient[]>{
    return this.http.get<Patient[]>(
      `${this.baseUrl}/patient`, 
      {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}

    )
  }

  getPatientById(id: string):Observable<Patient>{
    return this.http.get<Patient>(
      `${this.baseUrl}/patientSettings/${id}`, 
      {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    )
  }

  deletePatientById(id:string): Observable<any>{
   
    return this.http.delete(
      `${this.baseUrl}/patientSettings/${id}`, 
      {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    )
  }

  
}
