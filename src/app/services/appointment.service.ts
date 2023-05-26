import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }from '@angular/common/http';

@Injectable()
export class appointmentService {
    appointments: AppointmentModel[] = [];

  token = sessionStorage.getItem("token");
  dytId =sessionStorage.getItem("dietitianId");
  url1:string;
  url:string;
  
  constructor(private http:HttpClient) { 
    this.url1 = 'http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/appointments/dietitian/byDate/'+ this.dytId;
  }
   headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization' , 'Bearer '+this.token);
  
  getAppointmentDaily(day: string): Promise<any> {
    console.log(this.dytId)
    console.log(day)
    const today = new Date(); // Get the current date
  const formattedDate = today.toISOString().split('T')[0];
    const body = {
        appointmentDate: formattedDate,
    };

   
   

    return this.http.post(this.url1, body, {headers: this.headers }).toPromise();
  }
  getAppointmentYearly(){
    this.url='http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/appointments/appointmentCount';
    
    return this.http.get(this.url,{headers:this.headers}).toPromise();

  }
  cancelAppointment(id:number){
    const baseUrl='http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/appointments/updateStatus/'+id;
    const body={
      "status":"AVAILABLE"
    }
    return this.http.patch(baseUrl,body,{headers:this.headers}).toPromise()
  }

  
}