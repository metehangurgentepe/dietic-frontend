import { Component, OnInit } from '@angular/core';

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  

  constructor() { }

  weight: number;
  height: number;
  bmi: number;
  result: string;
  showResult: boolean;

   calculateBMI() {
    this.showResult=false;
    const heightInMeters = this.height / 100;
    this.bmi = this.weight / (heightInMeters * heightInMeters);
    if(this.bmi<18.5){
      this.result = 'Underweight';}
      else if(18.5<=this.bmi&&this.bmi<=24.9){
      this.result = 'Healthy';}
      else if(25<=this.bmi&&this.bmi<=29.9){
      this.result = 'Overweight';}
      else if(30<=this.bmi&&this.bmi<=34.9){
        this.result = 'Obese';}
      else if(35<=this.bmi){
       this.result = 'Extremely obese';}
       console.log(this.result);
       this.showResult=true;
    
  }
  
  ngOnInit() {
    
  }
}
