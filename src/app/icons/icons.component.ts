import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { of } from "rxjs";
import { FoodService } from '../services/foods.service';
import { ApiService } from '../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  amounts: number[] = [];
  details: string[] = [];
  date: string;
  selectedOption: string;
  options = ['Kahvaltı', 'Öğlen', 'Akşam', 'Snack', 'Summary'];
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
  currentDate: Date;
  DateOnly: string
  totalProtein: number = 0;
  totalEnergy: number = 0;
  totalCarbohydrate: number = 0;
  totalFat: number = 0;

  // Method to calculate the sums


  ngOnInit() {
    this.currentDate = new Date();
    const cValue = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
    console.log(cValue)
    this.DateOnly = cValue;


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

        }
      },
      error => {
        console.log('Error retrieving patient data:');
        console.log(error);
      }
    );
  }
  decreaseDate() {
    const currentDate = new Date(this.DateOnly);
    currentDate.setDate(currentDate.getDate() - 1);
    this.DateOnly = currentDate.toISOString().split('T')[0];
  }

  increaseDate() {
    const currentDate = new Date(this.DateOnly);
    currentDate.setDate(currentDate.getDate() + 1);
    this.DateOnly = currentDate.toISOString().split('T')[0];
  }


  getFoods(event) {
    const foods = event.target.value;
    this.foodService.buscarFilme(foods).then(res => {
      console.log(res);
      this.foods = res['results'];
      this.meals = res;
      this.amounts = new Array(this.meals.length).fill(1);
      this.details = new Array(this.meals.length).fill('');
    });
  }

  getRowData(food: any, amount: number, detail: string) {
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
    else if (this.selectedOption == 'Summary') {
      for (let i = 0; i < this.kahvaltiArr.length + this.oglenArr.length + this.aksamArr.length + this.snackArr.length; i++) {

      }
    }
    this.calculateTotals();
  }
  calculateTotals() {
    this.totalProtein = this.kahvaltiArr.reduce((sum, food, index) => sum + food.protein * this.kahvaltiArrServ[index], 0) +
      this.oglenArr.reduce((sum, food, index) => sum + food.protein * this.oglenArrServ[index], 0) +
      this.aksamArr.reduce((sum, food, index) => sum + food.protein * this.aksamArrServ[index], 0) +
      this.snackArr.reduce((sum, food, index) => sum + food.protein * this.snackArrServ[index], 0);

    this.totalEnergy = this.kahvaltiArr.reduce((sum, food, index) => sum + food.energy * this.kahvaltiArrServ[index], 0) +
      this.oglenArr.reduce((sum, food, index) => sum + food.energy * this.oglenArrServ[index], 0) +
      this.aksamArr.reduce((sum, food, index) => sum + food.energy * this.aksamArrServ[index], 0) +
      this.snackArr.reduce((sum, food, index) => sum + food.energy * this.snackArrServ[index], 0);

    this.totalCarbohydrate = this.kahvaltiArr.reduce((sum, food, index) => sum + food.carbohydrate * this.kahvaltiArrServ[index], 0) +
      this.oglenArr.reduce((sum, food, index) => sum + food.carbohydrate * this.oglenArrServ[index], 0) +
      this.aksamArr.reduce((sum, food, index) => sum + food.carbohydrate * this.aksamArrServ[index], 0) +
      this.snackArr.reduce((sum, food, index) => sum + food.carbohydrate * this.snackArrServ[index], 0);

    this.totalFat = this.kahvaltiArr.reduce((sum, food, index) => sum + food.fat * this.kahvaltiArrServ[index], 0) +
      this.oglenArr.reduce((sum, food, index) => sum + food.fat * this.oglenArrServ[index], 0) +
      this.aksamArr.reduce((sum, food, index) => sum + food.fat * this.aksamArrServ[index], 0) +
      this.snackArr.reduce((sum, food, index) => sum + food.fat * this.snackArrServ[index], 0);
  }
  onPatientSelect(event) {
    this.selectedPatients = event.target.value;
    this.patientId = this.selectedPatients;
    console.log('Selected patient:', this.selectedPatients);
    this.postUrl = 'http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/dietPlans/' + this.dietitianId + '/' + this.patientId;

  }
  removeRowData(i: number) {
    if (this.selectedOption == 'Kahvaltı') {
      this.kahvaltiArr.splice(i, 1);
      this.kahvaltiArrDet.splice(i, 1);
      this.kahvaltiArrServ.splice(i, 1)
      console.log(this.kahvaltiArrDet);
    }
    else if (this.selectedOption == 'Öğlen') {
      this.oglenArr.splice(i, 1);
      this.oglenArrDet.splice(i, 1);
      this.oglenArrServ.splice(i, 1)
    }
    else if (this.selectedOption == 'Akşam') {
      this.aksamArr.splice(i, 1);
      this.aksamArrDet.splice(i, 1);
      this.aksamArrServ.splice(i, 1)
    }
    else if (this.selectedOption == 'Snack') {
      this.snackArr.splice(i, 1);
      this.snackArrDet.splice(i, 1);
      this.snackArrServ.splice(i, 1)
    }
    this.calculateTotals();
  }

  //private postUrl = 'http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/dietPlans/' + this.dietitianId + '/'+this.patientId;

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
    console.log(this.kahvaltiArrServ)
    console.log(this.kahvaltiArr)
    console.log(this.kahvaltiArrDet)
    for (let i = 0; i < this.kahvaltiArr.length; i++) {
      this.dietPlans = {
        day: this.DateOnly,
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

      this.dietPlans = {
        day: this.DateOnly,
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

      this.dietPlans = {
        day: this.DateOnly,
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
      console.log(this.snackArrServ)
      this.dietPlans = {
        day: this.DateOnly,
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
  private apiUrl = 'http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/dietitians/patients';
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

