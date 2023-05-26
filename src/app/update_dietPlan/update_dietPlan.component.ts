import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { of } from "rxjs";
import { FoodService } from '../services/foods.service';
import { ApiService } from '../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { DietPlanService } from '../services/dietPlan.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-update_dietPlan.',
  templateUrl: './update_dietPlan.component.html',
  styleUrls: ['./update_dietPlan.component.css']
})
export class UpdateDietPlan implements OnInit {
  amounts: number[] = [];
  details: string[] = [];
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

  postUrl: string;
  breakfastData: any[];
  lunchData: any[];
  dinnerData: any[];
  snackData: any[];
  baseUrl:string;





  constructor(private location: Location,private foodService: FoodService, private http: HttpClient, private dietPlanService: DietPlanService, private router: ActivatedRoute,private route:Router) { }
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
  patientId: number;



  // Method to calculate the sums


  ngOnInit() {
    this.currentDate = new Date();
    const cValue = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
    console.log(cValue)
    this.DateOnly = cValue;
    const queryParams = this.router.snapshot.queryParams;
    const dietPlanData = JSON.parse(queryParams.data);

    // Access the values
    this.patientId = dietPlanData.patientId;
    this.date = dietPlanData.date;


    this.fetchMealData();
    this.calculateTotals();

    

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
  removeRowData(plan_id: number) {
    this.baseUrl = 'http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/dietPlans/delete/' + plan_id;
  
    this.http.delete(this.baseUrl, { headers: this.headers, responseType: 'text' }).subscribe(response => {
      console.log(response); // Print the response to the console or perform any other handling
      if (response === 'Food deleted successfully') {
        // Food item was successfully deleted
        this.fetchMealData();
        this.calculateTotals();
      } else {
        // Handle other response scenarios if needed
      }
    }, error => {
      console.error(error);
      // handle error separately
      
    });
  }
  

  getRowData(food: any, amount: number, detail: string) {
    this.baseUrl='http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/dietPlans/'+this.dietitianId+'/'+this.patientId;
    this.headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer ' + this.token)
    .set('Access-Control-Allow-Origin', '*');
    
    if (this.selectedOption == 'Kahvaltı') {
       const body={
        'food_id':food.food_id,
        'meal':1,
        'day':this.date,
        'portion':amount,
        'details':detail
      }
      this.http.post(this.baseUrl, body, { headers: this.headers }).subscribe(response => {
        console.log(response);
        // handle response
        this.fetchMealData();
    this.calculateTotals();

      }, error => {
        console.error(error);
        // handle error
      });

      
      console.log(this.kahvaltiArrDet);
    }
    else if (this.selectedOption == 'Öğlen') {
      const body={
        'food_id':food.food_id,
        'meal':2,
        'day':this.date,
        'portion':amount,
        'details':detail
      }
      this.http.post(this.baseUrl, body, { headers: this.headers }).subscribe(response => {
        console.log(response);
        // handle response
        this.fetchMealData();
      }, error => {
        console.error(error);
        // handle error
      });
    }
    else if (this.selectedOption == 'Akşam') {
      const body={
        'food_id':food.food_id,
        'meal':3,
        'day':this.date,
        'portion':amount,
        'details':detail
      }
      this.http.post(this.baseUrl, body, { headers: this.headers }).subscribe(response => {
        console.log(response);
        // handle response
        this.fetchMealData();
      }, error => {
        console.error(error);
        // handle error
      });
    }
    else if (this.selectedOption == 'Snack') {
      const body={
        'food_id':food.food_id,
        'meal':4,
        'day':this.date,
        'portion':amount,
        'details':detail
      }
      this.http.post(this.baseUrl, body, { headers: this.headers }).subscribe(response => {
        console.log(response);
        // handle response
        this.fetchMealData();
      }, error => {
        console.error(error);
        // handle error
      });
    }
    this.calculateTotals();
    console.log(this.totalProtein);
  }

  calculateTotals() {
    this.totalProtein = this.breakfastData.reduce((sum, food) => sum + food.protein, 0) +
      this.lunchData.reduce((sum, food) => sum + food.protein, 0) +
      this.dinnerData.reduce((sum, food) => sum + food.protein, 0) +
      this.snackData.reduce((sum, food, index) => sum + food.protein * this.snackArrServ[index], 0);
  
    this.totalEnergy = this.breakfastData.reduce((sum, food) => sum + food.energy, 0) +
      this.lunchData.reduce((sum, food) => sum + food.energy, 0) +
      this.dinnerData.reduce((sum, food) => sum + food.energy, 0) +
      this.snackData.reduce((sum, food) => sum + food.energy, 0);
  
    this.totalCarbohydrate = this.breakfastData.reduce((sum, food) => sum + food.carb, 0) +
      this.lunchData.reduce((sum, food) => sum + food.carb, 0) +
      this.dinnerData.reduce((sum, food) => sum + food.carb, 0) +
      this.snackData.reduce((sum, food) => sum + food.carb, 0);
  
    this.totalFat = this.breakfastData.reduce((sum, food) => sum + food.fat, 0) +
      this.lunchData.reduce((sum, food) => sum + food.fat, 0) +
      this.dinnerData.reduce((sum, food) => sum + food.fat, 0) +
      this.snackData.reduce((sum, food) => sum + food.fat, 0);
  
    console.log(this.totalProtein);
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
  saveData() {
    this.location.back()
  }



  
  fetchMealData() {
    console.log('burada')
    this.dietPlanService.getAllMealData(this.patientId, this.date).subscribe(data => {

      

      console.log(data);
      this.breakfastData = data.filter(item => item.meal === 1);
      this.lunchData = data.filter(item => item.meal === 2);
      this.dinnerData = data.filter(item => item.meal === 3);
      this.snackData = data.filter(item => item.meal === 4);



      this.totalProtein = this.breakfastData.reduce((sum, food) => sum + food.protein, 0) +
      this.lunchData.reduce((sum, food) => sum + food.protein, 0) +
      this.dinnerData.reduce((sum, food) => sum + food.protein, 0) +
      this.snackData.reduce((sum, food, index) => sum + food.protein * this.snackArrServ[index], 0);
  
    this.totalEnergy = this.breakfastData.reduce((sum, food) => sum + food.energy, 0) +
      this.lunchData.reduce((sum, food) => sum + food.energy, 0) +
      this.dinnerData.reduce((sum, food) => sum + food.energy, 0) +
      this.snackData.reduce((sum, food) => sum + food.energy, 0);
  
    this.totalCarbohydrate = this.breakfastData.reduce((sum, food) => sum + food.carb, 0) +
      this.lunchData.reduce((sum, food) => sum + food.carb, 0) +
      this.dinnerData.reduce((sum, food) => sum + food.carb, 0) +
      this.snackData.reduce((sum, food) => sum + food.carb, 0);
  
    this.totalFat = this.breakfastData.reduce((sum, food) => sum + food.fat, 0) +
      this.lunchData.reduce((sum, food) => sum + food.fat, 0) +
      this.dinnerData.reduce((sum, food) => sum + food.fat, 0) +
      this.snackData.reduce((sum, food) => sum + food.fat, 0);
    });
    
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

