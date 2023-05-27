import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { post } from 'jquery';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent implements OnInit {
  loginFailed = false;
  responseDataRegister: any;
  responseDataLogin: any;
  emailLogin: string
  emailRegister: string
  passwordLogin: string
  passwordRegister: string


  private cookie_name = '';
  private all_cookies: any = '';
  constructor(private http: HttpClient, private router: Router, private cookie: CookieService,private toastr: ToastrService) {
  }
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');


  configUrl = 'assets/config.json';


  onRegister(person: { name: string, surname: string, email: string, password: string, roleName: string }) {
    person.roleName = 'ROLE_DIETITIAN';
    person.email=this.emailRegister;
    person.password=this.passwordRegister;
    const jsonString = JSON.stringify(person);
  
    console.log(jsonString);
    try {
      this.http.post('http://dietic.eu-north-1.elasticbeanstalk.com/api/auth/register', JSON.stringify(person), { headers: this.headers })
        .subscribe(
          (response) => {
            console.log(response);
            this.responseDataRegister = response;
            if (response != null) {
              sessionStorage.setItem('email', person.email);
              sessionStorage.setItem('firstName', person.name);
              sessionStorage.setItem('lastName', person.surname);
              
            sessionStorage.setItem('dietitianId', this.responseDataRegister.id);
              console.log(this.responseDataRegister.token);
              sessionStorage.setItem('token', this.responseDataRegister.accessToken);
              this.router.navigate(['dashboard']);
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
  
  onLogin(person: { email: string, password: string }) {
    person.email=this.emailLogin;
    person.password=this.passwordLogin
    console.log(person);
    this.http.post('http://dietic.eu-north-1.elasticbeanstalk.com/api/auth/login', JSON.stringify(person), { headers: this.headers }).subscribe(
      (response) => {
        this.responseDataLogin = response;
        console.log(response);
        console.log(this.responseDataLogin.token);
        try {
        console.log(response);
          if (response != null) {
            // Store data in sessionStorage
            sessionStorage.setItem('email', person.email);
            sessionStorage.setItem('firstname', this.responseDataLogin.firstName);
            sessionStorage.setItem('dietitianId', this.responseDataLogin.id);
            sessionStorage.setItem('lastname', this.responseDataLogin.lastName);
            sessionStorage.setItem('token', this.responseDataLogin.accessToken);
            console.log(this.responseDataLogin.dietitianId);
            sessionStorage.setItem('dietitianId', this.responseDataLogin.id);
            if (this.responseDataLogin.roleName === "ROLE_PATIENT") {
              this.router.navigate(['patient_login']);
            } else {
              this.router.navigate(['dashboard']);
            }
          } else if (response == null) {
            this.loginFailed = true;
          }
        } catch (err) {
          this.loginFailed = true;
          console.log(this.loginFailed);
          // Show warning message here
          this.toastr.error('An error occurred during login. Please try again.');
        }
      },
      (error) => {
        this.loginFailed = true;
        console.log(this.loginFailed);
        // Show warning message here
        this.toastr.error('An error occurred during login. Please try again.');
      }
    );
  }
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  ngOnInit() {


    //ön yüzdeki butonların hareketi için
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
    // backend service
    // this.http.post<any>('http://192.168.1.103:8080/api/v1/auth/authenticate', { title: 'Angular POST Request Example' }).subscribe(data => {
    //   this. = data.id;
    // })


  }
}

