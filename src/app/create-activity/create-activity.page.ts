import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

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

  constructor(private http: HttpClient, private alertController: AlertController) { }

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
          this.presentAlert('Skapad!', 'Aktiviteten skapades och dina vänner är nu inbjudna!');
        }, error => {
          console.log(error);
          this.presentAlert('Fel!', 'Aj då, nu gick något snett. Kolla så datumet är rätt!');
        });
  }
  async presentAlert(header: string, msg: string) {
      const alert = await this.alertController.create({
        header: header,
        message: msg,
        buttons: ['OK']
      });

      await alert.present();
  }
}
