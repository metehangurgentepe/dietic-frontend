import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService) {}
  data:any;
  ngOnInit() {
      this.getData().subscribe(data => {
        this.data = data;
      });
  }
  private apiUrl = 'http://localhost:8080/api/v1/dietitians/patients';
  token = sessionStorage.getItem("token");
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization' , 'Bearer '+this.token)
    .set('Access-Control-Allow-Origin', '*');
  getData() {
    return this.http.get(this.apiUrl,{headers:this.headers});
  }
  // openPopup() {
  //   const dialogRef = this.dialog.open(PopupComponent, {
  //     width: '500px'
  //   });
  // }
}
