import { ConsultationService } from './../doctor-advice/service/consultation.service';
import { BaseUrlService } from './../base-url.service';
import { Glucose } from 'src/app/medi-data-repo/interface/glucose';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carb } from '../medi-data-repo/interface/carb';
import { Doctor } from './doctor';
import { Patient } from './patient';
import { Consultation } from '../doctor-advice/interface/consultation';
import { Identifiers } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  
  private readonly baseUrl = this.baseUrlService.getBaseUrl();

  constructor(private http:HttpClient, private baseUrlService:BaseUrlService) { }

  //login
  signUpDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(
      `${this.baseUrl}/doctor`, doctor, 
     {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    )
  }

  getPatientsbyDoctorId(id:string): Observable<Patient[]>{

    return this.http.get<Patient[]>(
          `${this.baseUrl}/doctor/${id}/patient/`,
         {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    )
  }




  getCarbsByPatientId(id: string): Observable<Carb[]>{
    return this.http.get<Carb[]>(
      `${this.baseUrl}/doctor/${id}/carb/`,
      {headers:new HttpHeaders(
        {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
        )
      }

    )
}


getGlucosesByPatientId(id: string): Observable<Glucose[]>{
  return this.http.get<Glucose[]>(
    `${this.baseUrl}/doctor/${id}/glucose/`,
    {headers:new HttpHeaders(
      {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
      )
    }

  )
}

getConsultationsByPatientId(id: string): Observable<Consultation[]>{
  return this.http.get<Consultation[]>(
    `${this.baseUrl}/doctorPatient/${id}/consultation/`,
    {headers:new HttpHeaders(
      {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
      )
    }
  ) 
}



editConsultationByPatientId(patientId: string, cons: Consultation): Observable<Consultation>{
  return this.http.put<Consultation>(
    `${this.baseUrl}/doctorPatient/${patientId}/consultation/${cons.id}`, cons,
    {headers:new HttpHeaders(
      {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
      )
    }
  ) 
}

getNeedConsPatientsbyDoctorId(id: string): Observable<Patient[]>{ 
  console.log(`${this.baseUrl}/doctor/${id}/needConsultationPatients/`)
  return this.http.get<Patient[]>(
        `${this.baseUrl}/doctor/${id}/needConsultationPatients/`,
       {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
  )
}


getUnconsultedPatientsbyDoctorId(id: string): Observable<Patient[]>{ 
  return this.http.get<Patient[]>(
        `${this.baseUrl}/doctor/${id}/unconsultedPatients/`,
       {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
  )
}

insertConsultationByPatientId(patientId: string, cons: Consultation): Observable<Consultation>{
  return this.http.post<Consultation>(
    `${this.baseUrl}/doctorPatient/${patientId}/consultation/`, cons,
    {headers:new HttpHeaders(
      {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
      )
    }
  ) 

}



}