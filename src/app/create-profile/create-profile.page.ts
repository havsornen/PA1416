import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {

  email_input;
  firstname_input;
  lastname_input;
  password_input;
  headers = {
    'headers': new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  private register() {
    const user_data = {
      'email' : this.email_input,
      'pwd' : this.password_input,
      'fName' : this.firstname_input,
      'lName' : this.lastname_input,
      'telNumber' : '+46'
    };

    const URL = 'http://localhost:8080/SE_RESTApi_war_exploded/user/create';

    this.http.post(URL, user_data, this.headers)
        .subscribe((response) => {
          console.log('Success: ' + response['usr_email']);
          this.router.navigate(['login']);
        }, error => {
          console.log('Error: ' + error.error['response']);
        });
  }

}
