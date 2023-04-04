import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient,private router: Router) { 
  }
  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  onRegister(person:{firstName:string,lastName:string,email:string,password:string}){
    console.log(person);
    const jsonString=JSON.stringify(person);
    console.log(jsonString);
    try{
      this.http.post('http://localhost:8080/api/v1/auth/register',JSON.stringify(person),{headers:this.headers}).subscribe((response)=>{
        console.log(response);
        if(response =! null){
        this.router.navigate(['dashboard']);}
        });
    }
    catch(err){
      console.log(err.name)
    }
    
  }
  onLogin(person:{email:string,password:string}){
    try{
    console.log(person);
    this.http.post('http://localhost:8080/api/v1/auth/authenticate',JSON.stringify(person),{headers:this.headers}).subscribe((response)=>{
      console.log(response);
      if(response =! null){
        this.router.navigate(['dashboard']);
      }
    });
  }
  catch(err){
    console.log(err.name);
  }
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
