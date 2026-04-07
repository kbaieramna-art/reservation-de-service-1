import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// 🔥 IMPORT YOUR COMPONENTS
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddservicesComponent } from './components/addservices/addservices.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { PrestatairedashboardComponent } from './components/prestatairedashboard/prestatairedashboard.component';
import { ServicetabComponent } from './components/servicetab/servicetab.component';
import { UsertabComponent } from './components/usertab/usertab.component';
import { PrestatairetabComponent } from './components/prestatairetab/prestatairetab.component';
import { BookComponent } from './components/book/book.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SingleserviceComponent } from './components/singleservice/singleservice.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AddservicesComponent,
    AdmindashboardComponent,
    PrestatairedashboardComponent,
    ServicetabComponent,
    UsertabComponent,
    PrestatairetabComponent,
    BookComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    SingleserviceComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }