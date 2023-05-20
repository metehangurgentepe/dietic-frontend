import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { PatientModel } from '../models/patient_model';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService,public dialog: MatDialog) {}
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
  onButtonClick(patient: any) {
    console.log(patient);
    console.log('patient')
    var patient1 = JSON.stringify(patient);

    
    this.router.navigate(['/updatepatient'], { queryParams: { data: patient1 } });
  }
  showDietPlans(patient: any) {
    console.log(patient);
    console.log('patient')
    var patient1 = JSON.stringify(patient);
    this.router.navigate(['/typography'], { queryParams: { data: patient1 } });
  }
}
