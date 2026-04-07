import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-servicetab',
  templateUrl: './servicetab.component.html',
  styleUrls: ['./servicetab.component.css']
})
export class ServicetabComponent implements OnInit {
@Input() servicetab!:any;
@Output ()serviceoutput:EventEmitter<any> =new EventEmitter();


  constructor(private services: ServiceService,private router:Router) { }

  ngOnInit(): void {
    
  }
  deletservicre(id:any){
    console.log("here is delet")
     this.services.Deletservicebyid(id).subscribe(
      (response) => {
        console.log('here is response of delet', response);
        if (response.msg) {
          //auto resfrech
          this.services.Getallservices().subscribe(
            (data) => {
              this.serviceoutput.emit(data.tab);
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
