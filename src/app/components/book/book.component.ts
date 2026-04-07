import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  prestatireid!:any;
   reservationForm: FormGroup;

  constructor(private fb: FormBuilder,private router:ActivatedRoute) {
    this.reservationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      service: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      prestatireid:this.router.snapshot.paramMap.get('id'),
    });
  }
  ngOnInit() {
  
  }
  reservation() {
     
    if (this.reservationForm.valid) {
      console.log('Form Data:', this.reservationForm.value);

    } else {
      console.log('Form is invalid');
    }
  }
}
  

