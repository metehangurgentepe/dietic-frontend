import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { of } from "rxjs";
import { FoodService } from '../services/foods.service';
import { ApiService } from '../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  amount: string; // Initialize 'amount' as an empty string
  detail: string; 
  date: string; 
  selectedOption: string;
  options = ['Kahvaltı', 'Öğlen', 'Akşam', 'Snack'];
  patientsId = [];
  searchText;
  foods = [];
  meals = [];
  kahvaltiArr = [];
  oglenArr = [];
  aksamArr = [];
  snackArr = [];
  kahvaltiArrServ = [];
  oglenArrServ = [];
  aksamArrServ = [];
  snackArrServ = [];
  kahvaltiArrDet = [];
  oglenArrDet = [];
  aksamArrDet = [];
  snackArrDet = [];
  dietPlan = [];
  day = ['1', '2', '3', '4', '5', '6', '7'];
  patientsArray = [];
  selectedPatients!: number;
  patientId!: number;
  postUrl: string;





  constructor(private foodService: FoodService, private http: HttpClient) { }
  token = sessionStorage.getItem("token");
  dietitianId = sessionStorage.getItem("dietitianId");
  data: any[];
  Patients: any;
  ngOnInit() {
    var token = sessionStorage.getItem("token");
    console.log(token);
    this.getData().subscribe(
      Patients => {
        this.Patients = Patients;
        this.patientsArray = [];
        for (let i = 0; i < this.Patients.length; i++) {
          const patient = this.Patients[i];
          const label = `${patient.name} ${patient.surname}`;
          const value = patient.patient_id;
          const option = { label, value };
          this.patientsArray.push(option);
          console.log(this.detail);
        }
      },
      error => {
        console.log('Error retrieving patient data:');
        console.log(error);
      }
    );
  }


  getFoods(event) {
    const foods = event.target.value;
    this.foodService.buscarFilme(foods).then(res => {
      console.log(res);
      this.foods = res['results'];
      this.meals = res;
    });
  }
  
  getRowData(food: any,amount:number,detail:string) {
    if(detail==null && amount==null){
      detail='detail'
      amount=1
    }
    else if(amount==null){
      console.log('bura')
      amount=1
    }
    else if(detail==null){
      console.log('bura')
      detail='none'
    }
    this.dietPlan.push(food);
    if (this.selectedOption == 'Kahvaltı') {
      this.kahvaltiArr.push(food);
      this.kahvaltiArrDet.push(detail);
      this.kahvaltiArrServ.push(amount)
      console.log(this.kahvaltiArrDet);
    }
    else if (this.selectedOption == 'Öğlen') {
      this.oglenArr.push(food);
      this.oglenArrDet.push(detail);
      this.oglenArrServ.push(amount)
    }
    else if (this.selectedOption == 'Akşam') {
      this.aksamArr.push(food);
      this.aksamArrDet.push(detail);
      this.aksamArrServ.push(amount)
    }
    else if (this.selectedOption == 'Snack') {
      this.snackArr.push(food);
      this.snackArrDet.push(detail);
      this.snackArrServ.push(amount)
    }
  
  }
  onPatientSelect(event) {
    this.selectedPatients = event.target.value;
    this.patientId = this.selectedPatients;
    console.log('Selected patient:', this.selectedPatients);
    this.postUrl = 'http://localhost:8080/api/v1/dietPlans/' + this.dietitianId + '/' + this.patientId;

  }

  //private postUrl = 'http://localhost:8080/api/v1/dietPlans/' + this.dietitianId + '/'+this.patientId;

  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer ' + this.token)
    .set('Access-Control-Allow-Origin', '*');

  dietPlans = {
    food_id: null,
    day: null,
    meal: null,
    portion: null,
    details: null
  }
  postData() {
    for (let i = 0; i < this.kahvaltiArr.length; i++) {
      if(this.kahvaltiArrServ[i]==null){
        this.kahvaltiArrServ[i]=1
      }
      this.dietPlans = {
        day: this.date,
        meal: '1',
        food_id: this.kahvaltiArr[i].food_id,
        portion: this.kahvaltiArrServ[i],
        details: this.kahvaltiArrDet[i]
      }
      this.http.post(this.postUrl, this.dietPlans, { headers: this.headers }).subscribe(response => {
        console.log(response);
        // handle response
      }, error => {
        console.error(error);
        // handle error
      });
    }
    for (let i = 0; i < this.oglenArr.length; i++) {
      if(this.oglenArrServ[i]==null){
        this.oglenArrServ[i]=1
      }
      this.dietPlans = {
        day: this.date,
        meal: '2',
        food_id: this.oglenArr[i].food_id,
        portion: this.oglenArrServ[i],
        details: this.oglenArrDet[i]

      }
      this.http.post(this.postUrl, this.dietPlans, { headers: this.headers }).subscribe(response => {
        console.log(response);
        // handle response
      }, error => {
        console.error(error);
        // handle error
      });

    }
    for (let i = 0; i < this.aksamArr.length; i++) {
      if(this.aksamArrServ[i]==null){
        this.aksamArrServ[i]=1
      }
      this.dietPlans = {
        day: this.date,
        meal: '3',
        food_id: this.aksamArr[i].food_id,
        portion: this.aksamArrServ[i],
        details: this.aksamArrDet[i]
      }


      this.http.post(this.postUrl, this.dietPlans, { headers: this.headers }).subscribe(response => {
        console.log(response);
        // handle response
      }, error => {
        console.error(error);
        // handle error
      });

    }
    for (let i = 0; i < this.snackArr.length; i++) {
      if(this.snackArrServ[i]==null){
        this.snackArrServ[i]=1
      }
      this.dietPlans = {
        day: this.date,
        meal: '4',
        food_id: this.snackArr[i].food_id,
        portion: this.snackArrServ[i],
        details: this.snackArrDet[i]
      }
      this.http.post(this.postUrl, this.dietPlans, { headers: this.headers }).subscribe(response => {
        console.log(response);
        // handle response
      }, error => {
        console.error(error);
        // handle error
      });
    }
  }



  //hastaları çekme api si
  private apiUrl = 'http://localhost:8080/api/v1/dietitians/patients';
  getData() {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }


  onOptionSelected() {
    // console.log(this.selectedOption);
    // if(this.selectedOption=='Kahvaltı'){
    //   this.kahvalti.set(0,this.dietPlan);
    //   console.log(this.dietPlan);
    //   console.log('kahvaltı burada');
    //   console.log(this.kahvalti);
    //   console.log('********');
    // }


    // if(this.selectedOption=='Öğlen'){
    //   this.öglen.set(0,this.dietPlan);
    //   console.log('öğlen burada');
    //   console.log(this.öglen);
    //   console.log('********');

    // }
    // if(this.selectedOption=='Akşam'){
    //   this.aksam.set(0,this.dietPlan);
    //   console.log('akşam burada');
    //   console.log(this.aksam);
    //   console.log('********');
    // }
  }

  //  postData = {
  //   name:'ali akar',
  //   date: Date.now().toString,
  //   map1: Object.fromEntries(this.kahvalti),
  //   map2: Object.fromEntries(this.öglen),
  //   map3: Object.fromEntries(this.aksam),
  // }
  //  jsonString = JSON.stringify(this.postData);
  // log(jsonString: string): string {
  //   console.log(jsonString);
  //   return jsonString;
  // }  





}

