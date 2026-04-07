import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/userservice.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prestatairetab',
  templateUrl: './prestatairetab.component.html',
  styleUrls: ['./prestatairetab.component.css']
})
export class PrestatairetabComponent implements OnInit {
@Input() prestatairetab!:any;
 tab:any=[];
 prestataire:any=[];
 msg!:string;
@Output ()prestataireoutput:EventEmitter<any> =new EventEmitter();

  constructor(private userservice:UserServiceService,private router:Router) { }

  ngOnInit() {
  }
   deletuser(id:any){
    console.log("here is delet")
     this.userservice.Deletuser(id).subscribe(
      (response) => {
        console.log('here is response of delet', response);
        if (response.msg) {
          //auto resfrech
           this.userservice.Getallusers().subscribe(
            (data) => {
              let user = data.tab
              user.forEach((user: any) => {
                switch (user.role) {
                  case "prestataire":
                    this.tab.push(user);
                    break;
                  default:
                    console.warn("Unknown role:", user.role);
                }
              })
              this.prestataireoutput.emit(this.tab);


            }
          )
        }

      });

  }
  validate(id:any){
    console.log('validate clicked')
    this.userservice.validate(id).subscribe(
      (response)=>{
        console.log("here is response",response)
        this.msg=response.msg;
        if (response.msg) {
          //auto resfrech
          this.userservice.Getallusers().subscribe(
            (data) => {
              let user = data.tab
              user.forEach((user: any) => {
                switch (user.role) {
                  case "prestataire":
                    this.tab.push(user);
                    break;
                  default:
                    console.warn("Unknown role:", user.role);
                }
              })
              this.prestataireoutput.emit(this.tab);


            }
          )
        }
      }
      
    )
  } 
  edit(id:any){
    this.router.navigate([`edit/${id}`]);

  }

}
