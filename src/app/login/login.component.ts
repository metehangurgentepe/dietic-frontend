import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { post } from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent implements OnInit {
  loginFailed = false;
  responseDataRegister: any;
  responseDataLogin: any;
  
  private cookie_name='';
 private all_cookies:any='';
  constructor(private http: HttpClient,private router: Router,private cookie:CookieService) { 
  }
  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');


  configUrl = 'assets/config.json';


  onRegister(person:{firstName:string,lastName:string,email:string,password:string}){
    console.log(person);
    const jsonString=JSON.stringify(person);
    console.log(jsonString);
    try{
      this.http.post('http://localhost:8080/api/v1/auth/register',JSON.stringify(person),{headers:this.headers}).subscribe((response)=>{
        console.log(response);
          this.responseDataRegister = response;
        if(response =! null){
          sessionStorage.setItem('email', person.email);
          
          sessionStorage.setItem('firstName', person.firstName);
          sessionStorage.setItem('lastName', person.lastName);
          console.log(this.responseDataRegister.token);
          sessionStorage.setItem('token', this.responseDataRegister.accessToken);
        this.router.navigate(['dashboard']);}
        });
    }
    
    catch(err){
      console.log(err.name)
    }
    
  }
  onLogin(person:{email:string,password:string}){
    console.log(person);
    this.http.post('http://localhost:8080/api/auth/login',JSON.stringify(person),{headers:this.headers}).subscribe((response)=>{
      this.responseDataLogin = response;
      console.log(response);
      console.log(this.responseDataLogin.token);
      try{
      if(response =! null){
        sessionStorage.setItem('email', person.email);
        sessionStorage.setItem('firstname', this.responseDataLogin.firstName);
        sessionStorage.setItem('dietitianId', this.responseDataLogin.id);
        sessionStorage.setItem('lastname', this.responseDataLogin.lastName);
        sessionStorage.setItem('token', this.responseDataLogin.accessToken);
        console.log(this.responseDataLogin.dietitianId);
        sessionStorage.setItem('dietitianId', this.responseDataLogin.id);
        this.router.navigate(['dashboard']);
      }
      else if(response==null){
        this.loginFailed = true;
      }
    }
      catch(err){
        this.loginFailed = true;
        console.log(this.loginFailed);
      }
      
    });
  
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

