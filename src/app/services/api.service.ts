import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }from '@angular/common/http';

@Injectable()
export class ApiService {
  token = sessionStorage.getItem("token");
  url1:string;
  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization' , 'Bearer '+this.token);
  constructor(private http:HttpClient) { 
    this.url1 = 'http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/foods/search?query=';
  }
  getFoods(query:string):Promise<any>{
    console.log(this.token);
    return this.http.get(this.url1 + query, {headers: this.headers}).toPromise();
  }
}