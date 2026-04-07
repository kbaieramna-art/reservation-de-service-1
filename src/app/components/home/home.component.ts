import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
servicetab!:any;
  constructor(private services:ServiceService) { }

  ngOnInit(){
    this.services.Getallservices().subscribe(
      (data)=>{
        this.servicetab=data.tab;
      }
    )
  }

}
