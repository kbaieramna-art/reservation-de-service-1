import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { UserServiceService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  selectedTab: string = 'services';

  client:any[] = [];
  prestataire:any[] = [];
  service:any[] = [];
  admin:any[] = [];

  constructor(
    private services:ServiceService,
    private userservice:UserServiceService
  ) {}

  ngOnInit(){

    // SERVICES
    this.services.Getallservices().subscribe(response => {
      this.service = response.tab;
    });

    // USERS
    this.userservice.Getallusers().subscribe(response => {

      this.client = [];
      this.prestataire = [];
      this.admin = [];

      response.tab.forEach((user:any)=>{

        if(user.role === "prestataire"){
          this.prestataire.push(user);
        }

        else if(user.role === "user"){
          this.client.push(user);
        }

        else if(user.role === "admin"){
          this.admin.push(user);
        }

      });

    });

  }

  deletclient(tab:any){
    this.client = tab;
  }

  deletprestataire(tab:any){
    this.prestataire = tab;
  }

  deletservicre(tab:any){
    this.service = tab;
  }

  editservice(id:any){}

}
