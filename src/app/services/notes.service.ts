import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class NoteService{

    token = sessionStorage.getItem("token");
  url1:string;
  
  constructor(private http:HttpClient) { 
    this.url1 = 'http://localhost:8080/api/v1/notes/getUpcomingNotes';
  }
  
  getNotes(): Promise<any> {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization' , 'Bearer '+this.token);

    return this.http.get(this.url1, { headers }).toPromise();
  }
}