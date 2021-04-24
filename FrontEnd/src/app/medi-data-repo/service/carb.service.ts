import { BaseUrlService } from './../../base-url.service';
import { DatePipe } from '@angular/common';
import { Carb } from '../interface/carb';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarbService {
  path:string;
  patientId: string;


  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

  private readonly baseUrl = this.baseUrlService.getBaseUrl();

  addCarb(carb: Carb): Observable<Carb> {
     
    this.patientId = sessionStorage.getItem("id");

    return this.http.post<Carb>(
      `${this.baseUrl}/patient/${this.patientId}/carb/`, carb,
      {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
    )
  }

  getCarb(): Observable<Carb[]> {
    
    this.patientId = sessionStorage.getItem("id");

    return this.http.get<Carb[]>(
      `${this.baseUrl}/patient/${this.patientId}/carb/`,
      {headers: new HttpHeaders({'Authorization':'Basic ' + btoa(sessionStorage.getItem("credentials"))})}
      )
  }

  getCarbById(id: number){
    return this.http.get<Carb>(
      `${this.baseUrl}/carb/${id}`,
      {headers:new HttpHeaders(
        {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
        )
      }
      )

  }

  getAverageCarb(fromDate: Date,untilDate: Date): Observable<any> {

    this.patientId = sessionStorage.getItem("id");
    let datePipe:DatePipe = new DatePipe("en-US");
    this.path = `${this.baseUrl}/patientCarbAverage/1?start=${datePipe.transform(fromDate, 'dd/MM/yyyy')}&&end=${datePipe.transform(untilDate, 'dd/MM/yyyy')}`;
    console.log(this.path);

    return this.http.get<any>(
      `${this.baseUrl}/patientCarbAverage/${this.patientId}?start=${datePipe.transform(fromDate, 'dd/MM/yyyy')}&&end=${datePipe.transform(untilDate, 'dd/MM/yyyy')}`,
      {headers:new HttpHeaders(
        {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
        )
      }
      );
  }

  deleteCarb(carbId: number): Observable<any>{
    
  this.patientId = sessionStorage.getItem("id");

    return this.http.delete(
      `${this.baseUrl}/patient/${this.patientId}/carb/${carbId}`,
      {headers:new HttpHeaders(
        {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
        )
      })

  }

  editCarb(carb: Carb): Observable<Carb>{
    
  this.patientId = sessionStorage.getItem("id");

    return this.http.put<Carb>(
      `${this.baseUrl}/patient/${this.patientId}/carb/${carb.id}`, carb,
      {headers:new HttpHeaders(
        {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
        )
      }
      
      )
  }


  getCarbByPatientId(id: string, period: Date): Observable<Carb[]> {
    let datePipe:DatePipe = new DatePipe("en-US");
    return this.http.get<Carb[]>(
      `${this.baseUrl}/reportPatientCarb/${id}?period=${datePipe.transform(period, 'dd/MM/yyyy')}`,
      {headers:new HttpHeaders(
        {'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))}
        )
      }
      )
  }




}
