import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService, private toastr: ToastrService) {
  }

  ngOnInit() {
  }
  loginFailed = false;
  responseDataRegister: any;
  responseDataLogin: any;
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  onPatientRegister(person: { name: string, surname: string, email: string, password: string, roleName: string, dietitianId: number }) {
    console.log(person);
    const jsonString = JSON.stringify(person);
    const DietitianId = sessionStorage.getItem('dietitianId');
    console.log(jsonString);
    person.dietitianId = parseInt(DietitianId);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    person.roleName = "ROLE_PATIENT";
    console.log("person burada");
    console.log(person);

    this.http.post('http://localhost:8080/api/auth/register', JSON.stringify(person), { headers: headers }).subscribe((response) => {
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
