import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { UserServiceService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  eror!: string;
  valideror!: string;

  constructor(private userservice: UserServiceService, private router: Router) {}

  ngOnInit() {
    this.user = {
      email: '',
      password: '',
    };
  }

  Login() {
    console.log('Form submitted', this.user);

    this.userservice.login(this.user).subscribe(
      (response: any) => {
        console.log("here is login", response);

        if (response.msg != "2") {
          this.eror = "check your email/password";
        } else {
          sessionStorage.setItem("token", response.user);
          console.log("here is token", response.user);

          let decodedtoken: any = jwtDecode(response.user);
          console.log("here is token after decode", decodedtoken);

          if (decodedtoken.role == "user") {
            this.router.navigate(['']);
          } else if (decodedtoken.role == "prestataire") {
            if (decodedtoken.status == "not valid") {
              this.valideror = "not valid yet keep waiting";
            } else if (decodedtoken.status == "valid") {
              this.router.navigate(['/prestataire']);
            }
          } else if (decodedtoken.role == "admin") {
            this.router.navigate(['/admin']);
          }
        }
      },
      (error) => {
        console.log("login error", error);
      }
    );
  }
}