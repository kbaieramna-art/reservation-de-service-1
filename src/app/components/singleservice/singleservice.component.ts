import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-singleservice',
  templateUrl: './singleservice.component.html',
  styleUrls: ['./singleservice.component.css']
})
export class SingleserviceComponent implements OnInit {
services!:any;
prestataire!:any;
serviceid!:any;
  constructor(private service:ServiceService,private router:ActivatedRoute) { }

  ngOnInit() {
     this.serviceid = this.router.snapshot.paramMap.get('id');
    this.service.Getservicebyid(this.serviceid).subscribe(
      (doc) => {
        console.log("here is course by id", doc);
        this.services = doc.serviceobj;
        this.prestataire=doc.prestataireinfo;
         console.log("here is prestatire ", this.services);
         console.log("here is service ", this.prestataire);
      }
    )
  }

}
