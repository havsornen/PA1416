import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  headers = {
      'headers': new HttpHeaders({
           'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient,
              private router: Router,
              private us: UserServiceService) {
      if (this.us.getUser()) {
          this.router.navigate(['landingpage']);
      }
  }


  ngOnInit() {
  }

  public login() {
    const data = {
            'email' : this.email,
            'password' : this.password
           };

    const url = 'http://localhost:8080/SE_RESTApi_war_exploded/user/login';
    this.http.post(url, data, this.headers)
        .subscribe(
            (response) => {
                console.log('Logged in!');
                this.us.setUser(response);
                this.router.navigate(['landingpage']);
            },
            error => {
                console.log(error.error['response']);
            });
  }
}
