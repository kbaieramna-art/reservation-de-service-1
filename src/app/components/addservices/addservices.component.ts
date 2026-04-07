import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';
import { UserServiceService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-addservices',
  templateUrl: './addservices.component.html',
  styleUrls: ['./addservices.component.css']
})
export class AddservicesComponent implements OnInit {

 serviceForm!: FormGroup;
  message!:boolean;
  file!:File;
  service:any={};
  constructor(private servicesservice: ServiceService,private userservice:UserServiceService) { }

  ngOnInit() {
   
    
  }
  addservice() {
    console.log("here is servuice info",this.service,this.file);
    this.servicesservice.addservice(this.service,this.file).subscribe(
      (doc)=>{
        console.log("here is rresponse",doc.msg)
      }
    );
  }
    selectedimage(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      console.log("here is img of service", this.file);
    }


  }


}
