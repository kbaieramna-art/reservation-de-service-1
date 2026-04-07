import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupform!: FormGroup;
  emailmessage !: string;
  erormessage !: string;
  actuelpath !: string;
  file!: File;
  constructor(private formbuilder: FormBuilder, private userservice: UserServiceService, private router: Router) { }

  ngOnInit() {
    this.actuelpath = this.router.url;
    console.log("here is path", this.actuelpath);
    this.signupform = this.formbuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@!%*?&])[A-Za-z\\d$@!%*?&]{5,10}$')]],
      role: [''],
      status: [''],
      location: ['',[Validators.required, Validators.minLength(3)]]
    })
  }
  signup() {
    console.log('this ', this.signupform.value);
    if (this.actuelpath == "/signup") {
      this.signupform.get('role')?.setValue("user");
    } else if (this.actuelpath == "/signupprestatair") {
      this.signupform.get('role')?.setValue("prestataire");
      this.signupform.get('status')?.setValue("not valid");
    }
    else if (this.actuelpath == "/signupadmin") {
      this.signupform.get('role')?.setValue("admin");

    }
    // let users=JSON.parse(localStorage.getItem("users")||"[]");
    // this.signupform.value.id=this.generateid(users)
    // users.push(this.signupform.value);
    // localStorage.setItem("users",JSON.stringify(users));
    this.userservice.adduser(this.signupform.value, this.file).subscribe(
      (response) => {
        console.log("here is response to signup", response);
        if (response.msg == "1") {
          this.router.navigate(["login"]);

        } else if (response.msg == "0") {

          this.emailmessage = "email already exist";
        } else {
          this.erormessage = "an eror is succed"
        }
      }
    )
  }
  selectedimage(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    }


  }

}
