import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserServiceService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-usertab',
  templateUrl: './usertab.component.html',
  styleUrls: ['./usertab.component.css']
})
export class UsertabComponent implements OnInit {
 @Input() clienttab!:any;
 tab:any=[];
 @Output() clientoutput:EventEmitter<any> =new EventEmitter();
  constructor(private userservice:UserServiceService) { }

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
                  case "user":
                    this.tab.push(user);
                    break;
                  default:
                    console.warn("Unknown role:", user.role);
                }
              })
              this.clientoutput.emit(this.tab);


            }
          )
        }

      });

  }
}
