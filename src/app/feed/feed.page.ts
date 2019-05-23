import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  activites;

  constructor(private http: HttpClient, private us: UserServiceService) { }

  ngOnInit() {
    this.load_activites();
  }

  private load_activites() {
    const userData = Object.values(this.us.getUser());
    const userID = userData[1];
    const URL = 'http://localhost:8080/SE_RESTApi_war_exploded/activity/activity_feed/' + userID;

    this.http.get(URL)
        .subscribe((response) => {
          console.log(response);
          this.activites = response;
        }, error => {
          console.log(error);
        });
  }

}
