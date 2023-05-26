import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { PatientModel } from '../models/patient_model';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponents implements OnInit {
  @Input() inputData: string;
    constructor(private http: HttpClient, private route: ActivatedRoute, private cookie: CookieService, private toastr: ToastrService) {
    }
    responseDataRegister: any;
    patient:PatientModel;
    isDisabled = false;
  // component code here
  ngOnInit() {
    this.route.queryParams.subscribe((params: any)=>{
      console.log(params);
      this.patient=JSON.parse(params.data);
      console.log(this.patient);
    });
  }

  
  onPatientRegister(person: { name: string, surname: string, email: string,height:number,weight:number,about:string,bodyFat:number }) {
    const token = sessionStorage.getItem("token");
    console.log(person);
    const jsonString = JSON.stringify(person);
    const DietitianId = sessionStorage.getItem('dietitianId');
    console.log(jsonString);
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer '+token
    });
    console.log("person burada");
    console.log(person);
    person.name=(this.patient.name);
    person.surname=(this.patient.surname);

    this.http.put('http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/dietitians/patients/'+this.patient.patient_id, JSON.stringify(person), { headers: headers }).subscribe((response) => {
      console.log(response);
      this.responseDataRegister = response;
      try {
        if (response = ! null) {
          this.toastr.success(person.name + ' ' + person.surname + ' has added successful!');
        }
        else{
          this.toastr.warning(person.name + ' ' + person.surname + ' can not add!');
        }
      }
      catch (err) {
        console.log(err.name)
        console.log('hata')
      }
});

}
}