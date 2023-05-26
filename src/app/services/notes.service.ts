import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class NoteService{

    token = sessionStorage.getItem("token");
  url1:string;
  
  constructor(private http:HttpClient) { 
    this.url1 = 'http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/notes/getUpcomingNotes';
  }
  headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization' , 'Bearer '+this.token);
  
  getNotes(): Promise<any> {
    return this.http.get(this.url1, { headers:this.headers }).toPromise();
  }
  deleteNote(id:number){
    const url='http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/notes/delete/'+id;
    return this.http.delete(url,{ headers:this.headers }).toPromise();
  }
  noteIsDone(id:number){
    const url='http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/notes/updateStatus/'+id;
    const body={
      "done":"true"
    }
    return this.http.patch(url,body,{ headers:this.headers }).toPromise();
  }
}