import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }from '@angular/common/http';

@Injectable()
export class FoodService {

 
  token = sessionStorage.getItem("token");
  url1:string;
  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization' , 'Bearer '+this.token);
  constructor(private http:HttpClient) { 
    this.url1 = 'http://localhost:8080/api/v1/foods/search?query=';

  }
  buscarFilme(query:string):Promise<any>{
    return this.http.get(this.url1 + query, {headers: this.headers}).toPromise();
  }
}