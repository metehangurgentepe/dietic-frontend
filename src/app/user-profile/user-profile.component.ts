import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  emailForm: FormGroup;
  constructor(private http: HttpClient, private router: Router, private cookie: CookieService, private toastr: ToastrService) {

  }

  ngOnInit() {

  }

  passwordRegister: string
  email: string
  isValid: boolean



  loginFailed = false;
  responseDataRegister: any;
  responseDataLogin: any;
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
  onPatientRegister(person: { name: string, surname: string, email: string, password: string, roleName: string, dietitianId: number, height: number, weight: number, about: string, bodyFat: number }) {
    person.roleName = "ROLE_PATIENT";
    person.email = this.email;
    person.password = this.passwordRegister;
    const jsonString = JSON.stringify(person);
    const DietitianId = sessionStorage.getItem('dietitianId');
    person.dietitianId = parseInt(DietitianId);

    console.log(jsonString);
    try {
      this.http.post('http://dietic.eu-north-1.elasticbeanstalk.com/api/auth/register', JSON.stringify(person), { headers: this.headers })
        .subscribe(
          (response) => {
            console.log(response);
            this.responseDataRegister = response;
            if (response != null) {
              this.toastr.success(person.name + ' ' + person.surname + ' was added successfully!');
            }
            else {
              this.toastr.warning(person.name + ' ' + person.surname + ' could not be added!');
            }
          },
          (error) => {
            console.log(error);
            if (error.error.message === 'Email already exists!.') {
              this.toastr.error('Email already exists! Please choose a different email address.', 'Registration Failed');
            } else {
              this.toastr.error('An error occurred during registration. Please try again later.', 'Registration Failed');
            }
          }
        );
    } catch (err) {
      console.log(err.name);
    }
  }

  //   onPatientRegister(person: { name: string, surname: string, email: string, password: string, roleName: string, dietitianId: number, height: number, weight: number, about: string, bodyFat: number }) {

  //     person.email = this.email;
  //     person.password = this.passwordRegister;

  //     const DietitianId = sessionStorage.getItem('dietitianId');
  //     console.log(person);


  //     person.dietitianId = parseInt(DietitianId);
  //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //     person.roleName = "ROLE_PATIENT";

  //     this.http.post('http://dietic.eu-north-1.elasticbeanstalk.com/api/auth/register', JSON.stringify(person), { headers: headers }).subscribe(
  //       (response) => {

  //         this.responseDataRegister = response;
  //         try {
  //           if (response = ! null) {
  //             this.toastr.success(person.name + ' ' + person.surname + ' has added successful!');
  //           }
  //           else {
  //             this.toastr.warning(person.name + ' ' + person.surname + ' can not add!');
  //           }
  //         }
  //       }
  //         (error) => {
  //         console.log(error);
  //         if (error.error.message === 'Email already exists!.') {
  //           this.toastr.error('Email already exists! Please choose a different email address.', 'Registration Failed');
  //         } else {
  //           this.toastr.error('An error occurred during registration. Please try again later.', 'Registration Failed');
  //         }
  //       }
  //       }
  //   catch(err) {
  //     console.log(err.name)
  //     console.log('hata')
  //   }


  // }
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
