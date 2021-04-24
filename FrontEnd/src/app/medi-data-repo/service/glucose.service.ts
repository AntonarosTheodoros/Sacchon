import { BaseUrlService } from './../../base-url.service';
import { Glucose } from '../interface/glucose';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GlucoseService {

  patientId:string;

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

  private readonly baseUrl = this.baseUrlService.getBaseUrl();

  addGlucose(measurement: Glucose): Observable<Glucose> {
    this.patientId = sessionStorage.getItem("id");

    return this.http.post<Glucose>(
      `${this.baseUrl}/patient/${this.patientId}/glucose/`, measurement,
      {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    )
  }


  getGlucose(): Observable<Glucose[]> {
    this.patientId = sessionStorage.getItem("id");
    console.log("this patient" , this.patientId);
    return this.http.get<Glucose[]>(
      `${this.baseUrl}/patient/${this.patientId}/glucose/`,
      {headers:new HttpHeaders(
        {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
        )
      }
      )
  }

  
  getGlucoseByPatientId(id: string, period: Date): Observable<Glucose[]> {
    let datePipe:DatePipe = new DatePipe("en-US");
    return this.http.get<Glucose[]>(
      `${this.baseUrl}/reportPatientGlucose/${id}?period=${datePipe.transform(period, 'dd/MM/yyyy')}`,
      {headers:new HttpHeaders(
        {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
        )
      }
      )
  }

  getAverageGlucose(fromDate: Date, untilDate: Date): Observable<Glucose> {
    this.patientId = sessionStorage.getItem("id");
    let datePipe:DatePipe = new DatePipe("en-US");
 
    return this.http.get<any>(
      `${this.baseUrl}/patientGlucoseAverage/${this.patientId}?start=${datePipe.transform(fromDate, 'dd/MM/yyyy')}&&end=${datePipe.transform(untilDate, 'dd/MM/yyyy')}`,
      {headers:new HttpHeaders(
        {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
        )
      }
      );
  }

  deleteGlucose(id:number): Observable<any>{
    this.patientId = sessionStorage.getItem("id");
    return this.http.delete(
      `${this.baseUrl}/patient/${this.patientId}/glucose/${id}`,
      {headers:new HttpHeaders(
        {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
        )
      }

    )
  }


  editGlucose(glucose: Glucose): Observable<Glucose>{
    
    this.patientId = sessionStorage.getItem("id");
  
      return this.http.put<Glucose>(
        `${this.baseUrl}/patient/${this.patientId}/glucose/${glucose.id}`, glucose,
        {headers:new HttpHeaders(
          {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
          )
        }
        
        )
    }

}

