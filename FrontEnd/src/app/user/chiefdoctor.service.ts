import { Consultation } from './../doctor-advice/interface/consultation';
import { Doctor } from './doctor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrlService } from '../base-url.service';
import { Patient } from './patient';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ChiefdoctorService {

  private readonly baseUrl = this.baseUrlService.getBaseUrl();

  constructor(private http:HttpClient, private baseUrlService:BaseUrlService) { }


  getInactivePatients(period: Date): Observable<Patient[]>{ 
    let datePipe:DatePipe = new DatePipe("en-US");
    console.log(`${this.baseUrl}/patientInactive`)
    return this.http.get<Patient[]>(
          `${this.baseUrl}/patientInactive?period=${datePipe.transform(period, 'dd/MM/yyyy')}`,
         {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    )
  }

  getInactiveDoctors(period: Date): Observable<Doctor[]>{ 
    let datePipe:DatePipe = new DatePipe("en-US");
    console.log(`${this.baseUrl}/doctorInactive`)
    return this.http.get<Patient[]>(
          `${this.baseUrl}/doctorInactive?period=${datePipe.transform(period, 'dd/MM/yyyy')}`,
         {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    )
  }
  getUnconsultedPatients():Observable<Patient[]>{
    return this.http.get<Patient[]>(
      `${this.baseUrl}/reportUnconsultedPatient/`,
      {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    )
  }

  
  getUnconsultedPatientsDiff():Observable<number[]>{
    return this.http.get<number[]>(
      `${this.baseUrl}/reportUnconsultedPatientDiff/`,
      {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    )
  }

  getConsultationbyDoctorId(id: string, period: Date):Observable<Consultation[]>{
    let datePipe:DatePipe = new DatePipe("en-US");
    return this.http.get<Consultation[]>(
      `${this.baseUrl}/reportDoctorConsultation/${id}?period=${datePipe.transform(period, 'dd/MM/yyyy')}`,
      {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    )
  }

  signUpNewChiefDoctor(chief: Doctor): Observable<Doctor>{
    return this.http.post<Doctor>(
      `${this.baseUrl}/chiefDoctor`, chief, 
     {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    )  
  }

  getAllDoctors():Observable<Doctor[]>{
    return this.http.get<Doctor[]>(
      `${this.baseUrl}/doctor`,
      {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
     )  
   }



  }
