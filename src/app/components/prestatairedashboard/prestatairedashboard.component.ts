import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-prestatairedashboard',
  templateUrl: './prestatairedashboard.component.html',
  styleUrls: ['./prestatairedashboard.component.css']
})
export class PrestatairedashboardComponent implements OnInit {
  email!: string;
  usertab!: any;
  user!: any;
  servicetab:any={};
  constructor(private services:ServiceService,private router:Router) { }

  ngOnInit() {
    sessionStorage.setItem("token", this.usertab);
    console.log("here is token", this.usertab);
    let decodedtoken: any = jwtDecode(this.usertab);
    console.log("here is token after decode", decodedtoken);
    this.email=decodedtoken.email;
    this.user=decodedtoken;
    this.services.Getservicebyprestaitre(this.email).subscribe(
      (data)=>{
        this.servicetab=data.tab;
      }
    )
  }
   deletservicre(id:any){
    console.log("here is delet")
     this.services.Deletservicebyid(id).subscribe(
      (response) => {
        console.log('here is response of delet', response);
        if (response.msg) {
          //auto resfrech
          this.services.Getservicebyprestaitre(this.email).subscribe(
            (data) => {
              this.servicetab=data.tab;
            })
        }
      }
    );

  }
  editservice(id:any){
     console.log("here is edit")
     this.router.navigate([`editservice/${id}`])
  }

}
