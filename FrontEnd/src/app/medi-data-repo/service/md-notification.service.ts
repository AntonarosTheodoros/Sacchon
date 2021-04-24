import { BaseUrlService } from './../../base-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MdNotificationService {

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }



  private readonly baseUrl = this.baseUrlService.getBaseUrl();


  getPatientNotification(){
    
  }

}
