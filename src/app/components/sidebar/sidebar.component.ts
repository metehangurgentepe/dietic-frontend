import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Home',  icon: 'design_app', class: '' },
    { path: '/dietplan', title: 'Diet Plan',  icon:'files_paper', class: '' },
    { path: '/bmi', title: 'BMI',  icon:'sport_user-run', class: '' },
    { path: '/addfood', title: 'Add Food',  icon:'ui-1_simple-add', class: '' },
    { path: '/addpatient', title: 'Add Patient',  icon:'users_single-02', class: '' },
    { path: '/patients', title: 'Patients',  icon:'design_bullet-list-67', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
