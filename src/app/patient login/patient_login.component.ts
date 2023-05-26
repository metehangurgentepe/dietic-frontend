import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-patient_login',
  templateUrl: './patient_login.component.html',
  styleUrls: ['./patient_login.component.css'],
})


export class PatientLoginComponent implements OnInit {
  loginFailed = false;
  responseDataRegister: any;
  responseDataLogin: any;
  currentDate: Date;
  
  
  constructor(private http: HttpClient,private router: Router,private cookie:CookieService) { 
  }
  


  configUrl = 'assets/config.json';

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

