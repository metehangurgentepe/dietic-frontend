import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewChild, ElementRef} from "@angular/core";
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
  selectedOption: string;
  options = ['Kahvaltı', 'Öğlen', 'Akşam'];
  patientsArray = [];
  patientsId = [];
  searchText;
  foods = [];
  meals = [];
  kahvaltiArr=[];
  oglenArr=[];
  aksamArr=[];
  kahvalti= new Map<number, any[]>();
  öglen=new Map<number, any[]>();
  aksam=new Map<number, any[]>();
  dietPlan=[];

  constructor(private foodService:FoodService,private http: HttpClient){

  }

  data: any[];
  Patients:any;

  ngOnInit() {
    var token = sessionStorage.getItem("token");
    console.log(token);
    this.getData().subscribe(Patients => {
      this.Patients = Patients;
      console.log('patientslar burada')
      console.log(this.Patients);
      this.Patients.forEach(element => {
        this.patientsArray.push(element.name+' '+element.surname)
        this.patientsId.push(element.patient_id)
      });
    });
  }

   getFoods(event){
    const foods = event.target.value;
     this.foodService.buscarFilme(foods).then(res => {
       console.log(res);
       this.foods = res['results'];
       this.meals=res;
     });
   }
   getRowData(food) {
    this.dietPlan.push(food);
    console.log(food); // do something with the row data
    console.log('seçilmiş öğün');
    if(this.selectedOption=='Kahvaltı'){
    this.kahvaltiArr.push(food);

    this.kahvalti.set(0,this.kahvaltiArr);
    console.log('kahvaltı burada');
    console.log(this.kahvalti);
    console.log('********');
    }
  else if(this.selectedOption=='Öğlen'){
    this.oglenArr.push(food);
      this.öglen.set(1,this.oglenArr);
      console.log(this.oglenArr);
      console.log('öğlen burada');
      console.log(this.öglen);
      console.log('********');
    }
  else if(this.selectedOption=='Akşam'){
      this.aksamArr.push(food);
      this.aksam.set(2,this.aksamArr);
      console.log('akşam burada');
      console.log(this.aksam);
      console.log('********');
      
          }
          const postData = {
            array1: this.kahvaltiArr,
            array2: this.oglenArr,
            array3: this.aksamArr,
            date: Date.now().toString,
            id: 32
          };
          let jsonString = JSON.stringify(postData);
          console.log('---------');
          console.log(jsonString);
          console.log('---------');

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

