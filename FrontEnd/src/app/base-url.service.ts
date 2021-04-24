import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {
 
  constructor() { }

  getBaseUrl(): string{
    // return 'http://localhost:9000/v1';
    return 'http://ec2-18-185-114-173.eu-central-1.compute.amazonaws.com/v1'
  }
}
