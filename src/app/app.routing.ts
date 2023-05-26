import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { UpdatePatientComponents } from './update-patient/update.component';
import { PatientLoginComponent } from './patient login/patient_login.component';
import { UpdateDietPlan } from './update_dietPlan/update_dietPlan.component';

const routes: Routes =[
  { path: 'updatepatient', component: UpdatePatientComponents },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x=>x.AdminLayoutModule)
  }]},
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    component: PatientLoginComponent,
    path: 'patient_login',
  },
  {
    component: UpdateDietPlan,
    path: 'updatedietplan',
  },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
