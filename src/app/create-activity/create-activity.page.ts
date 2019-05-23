import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.page.html',
  styleUrls: ['./create-activity.page.scss'],
})
export class CreateActivityPage implements OnInit {

  activity_title = '';
  activity_description = '';
  activity_startdate = '';
  activity_enddate = '';
  activity_permission = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public create_activity() {
    const URL = 'http://localhost:8080/SE_RESTApi_war_exploded/activity/create';
    const user_data = Object.values(JSON.parse(localStorage.getItem('loggedUser')));
    const user_ID = user_data[1];
    const data = {
      "act_owner": parseInt(user_ID.toString()),
      "act_title": this.activity_title,
      "start_d": this.activity_startdate,
      "end_d": this.activity_enddate,
      "act_permis": parseInt(this.activity_permission),
      "act_desc": this.activity_description,
      "act_type": 'Not implemented.'
    };

    this.http.post(URL, data)
        .subscribe((response) => {
          console.log(response);
        }, error => {
          console.log(error);
        });
  }
}
