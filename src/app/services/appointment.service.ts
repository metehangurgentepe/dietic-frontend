import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }from '@angular/common/http';

@Injectable()
export class appointmentService {
    appointments: AppointmentModel[] = [];

  token = sessionStorage.getItem("token");
  dytId =sessionStorage.getItem("dietitianId");
  url1:string;
  
  constructor(private http:HttpClient) { 
    this.url1 = 'http://localhost:8080/api/v1/appointments/dietitian/byDate/'+ this.dytId;
  }
  
  getAppointmentDaily(day: string): Promise<any> {
    console.log(this.dytId)
    console.log(day)
    const body = {
        appointmentDate: '2023-05-20',
    };

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization' , 'Bearer '+this.token);
   

    return this.http.post(this.url1, body, { headers }).toPromise();
  }

  
}