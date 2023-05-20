import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DietPlanService {
  private baseUrl = 'http://localhost:8080/api/v1'; // Replace with your API base URL
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
  }

  getMealData(patientId: number, mealId: number, date: string): Observable<any[]> {
    const url = `${this.baseUrl}/dietPlans/patient/${patientId}`;
  
    return this.http.post<any[]>(url, { date }, { headers: this.headers })
      .pipe(
        map((response: any[]) => response.filter(item => item.meal === mealId))
      );
  }
  getAllMealData(patientId: number,date: string): Observable<any[]> {
    const url = `${this.baseUrl}/dietPlans/patient/${patientId}`;
  
    const requestPayload = {
      day: date,
    };
  
    return this.http.post<any[]>(url, requestPayload, { headers: this.headers })
      .pipe(
        map((response: any[]) => response)
      );
  }
}