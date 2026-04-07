import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { AddservicesComponent } from './components/addservices/addservices.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { PrestatairedashboardComponent } from './components/prestatairedashboard/prestatairedashboard.component';
import { SingleserviceComponent } from './components/singleservice/singleservice.component';
import { BookComponent } from './components/book/book.component';

const routes: Routes = [
  {path:"signup", component:SignupComponent},
  {path:"signupadmin", component:SignupComponent},
  {path:"signupprestatair", component:SignupComponent},
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"admin", component:AdmindashboardComponent},
  {path:"addservices", component:AddservicesComponent},
  {path:"profile", component:EditprofileComponent},
  {path:"prestataire", component:PrestatairedashboardComponent},
  {path:"service/:id", component:SingleserviceComponent},
  {path:"book/:id", component:BookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
