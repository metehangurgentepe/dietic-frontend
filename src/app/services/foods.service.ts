import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }from '@angular/common/http';

@Injectable()
export class FoodService {

  url:string; 
  token = sessionStorage.getItem("token");
  url1:string;
  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization' , 'Bearer '+this.token);
  constructor(private http:HttpClient) { 
    this.url1 = 'http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/foods/search?query=';

  }
  buscarFilme(query:string):Promise<any>{
    return this.http.get(this.url1 + query, {headers: this.headers}).toPromise();
  }
  addFoods(foodId:number,description:string,protein:number,fat:number,carbohydrate:number,energy:number):Promise<any>{
    this.url='http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/foods/add';
    const body ={
      "food_id": foodId,
      "description": description,
      "protein": protein,
      "fat": fat,
      "carbohydrate": carbohydrate,
      "energy": energy
    }
    return this.http.post(this.url,body, {headers: this.headers}).toPromise();

  }
}