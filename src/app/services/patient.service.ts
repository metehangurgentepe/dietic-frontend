
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }from '@angular/common/http';

@Injectable()
export class patientService {
    appointments: AppointmentModel[] = [];

  token = sessionStorage.getItem("token");
  url1:string;
  
  constructor(private http:HttpClient) { 
    this.url1 = 'http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/dietitians/patients';
  }
  
  getPatient(): Promise<any> {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization' , 'Bearer '+this.token);

    return this.http.get(this.url1, { headers }).toPromise();
  }

  
}