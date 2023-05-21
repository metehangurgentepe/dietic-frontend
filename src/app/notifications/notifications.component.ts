import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FoodService } from '../services/foods.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
 

  constructor(private toastr: ToastrService,private foodService:FoodService,private http: HttpClient) {}
  token:string
  showNotification(from, align){

      const color = Math.floor((Math.random() * 5) + 1);

      switch(color){
        case 1:
        this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-info alert-with-icon",
           positionClass: 'toast-' + from + '-' +  align
         });
        break;
        case 2:
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-' + from + '-' +  align
         });
        break;
        case 3:
        this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-warning alert-with-icon",
           positionClass: 'toast-' + from + '-' +  align
         });
        break;
        case 4:
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
           timeOut: 8000,
           enableHtml: true,
           closeButton: true,
           toastClass: "alert alert-danger alert-with-icon",
           positionClass: 'toast-' + from + '-' +  align
         });
         break;
         case 5:
         this.toastr.show('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: 'toast-' + from + '-' +  align
          });
        break;
        default:
        break;
      }
  }
  ngOnInit() {
    
  }
 onAddFoods(food:{name:string,energy:number,protein:number,carbohydrate:number,Fat:number}){
  const postUrl='http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/foods/addFood'
  this.token = sessionStorage.getItem("token");
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer ' + this.token)
    const body={
      "description":food.name,
      "energy":food.energy,
      "fat":food.Fat,
      "protein":food.protein,
      "carbohydrate":food.carbohydrate
    }
    this.http.post(postUrl, body, { headers: headers }).subscribe(response => {
      console.log(response);
      this.toastr.success(food.name + ' has added successful!');    },
     error => {
      console.error(error);
      this.toastr.warning(food.name + ' can not add!');
    });



 }

}
