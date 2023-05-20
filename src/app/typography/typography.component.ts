import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DietPlanService } from '../services/dietPlan.service';
import { DatePipe, formatDate } from '@angular/common';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  patient: any;
  breakfastData: any[];
  lunchData: any[];
  dinnerData: any[];
  snackData: any[];
  outOfRecordsData: any[];
  currentDate: Date;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dietPlanService: DietPlanService,
    //private datePipe:DatePipe
  ) {
    this.currentDate = new Date();
    const cValue = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
    console.log(cValue)
    // this.currentDate = this.datePipe.transform(currentDateObj, 'yyyy-MM-dd');
    // console.log(this.currentDate)
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.patient = JSON.parse(params.data);
      const date = '2023-05-17'; // Get current date
      this.fetchMealData(date);
    });
  }

  fetchMealData(date: string) {
    this.currentDate = new Date();
    const cValue = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
    console.log(cValue)
    const patientId = this.patient.patient_id;
    
    this.dietPlanService.getAllMealData(patientId, cValue).subscribe(data => {
      console.log(data);
      console.log(cValue)
      
      this.breakfastData = data.filter(item => item.meal === 1);
      this.lunchData = data.filter(item => item.meal === 2);
      this.dinnerData = data.filter(item => item.meal === 3);
      this.snackData = data.filter(item => item.meal === 4);
      console.log(this.breakfastData);
      this.outOfRecordsData = data.filter(item => item.meal === 5);
    });
  }
}