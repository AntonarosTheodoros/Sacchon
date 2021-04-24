import { BaseUrlService } from './../../base-url.service';
import { Consultation } from './../interface/consultation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/user/patient';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  doctorID: number;

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

  private readonly baseUrl = this.baseUrlService.getBaseUrl();


  addConsultation(cons:Consultation){

    return this.http.post<Consultation>(
      `${this.baseUrl}/consultation`, cons
    )

  }

  getConsultations():Observable<Consultation[]>{
    return this.http.get<Consultation[]>(
      `${this.baseUrl}/consultation`
    )
    }


    getPatientConsultations(patientId: string): Observable<Consultation[]>{
      return this.http.get<Consultation[]>(
        `${this.baseUrl}/patient/${patientId}/consultation/`,
        {headers:new HttpHeaders(
          {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
          )
        }
        );
    }



    getConsulationsByDoctorId(doctorId: string, period: Date):Observable<Consultation[]>{
      let datePipe:DatePipe = new DatePipe("en-US");
        return this.http.get<Consultation[]>(
          `${this.baseUrl}/reportDoctorConsultation/${doctorId}?period=${datePipe.transform(period, 'dd/MM/yyyy')}`,
          {headers:new HttpHeaders(
            {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
            )
          }
          );
      }
  

    }


