import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.page.html',
  styleUrls: ['./landingpage.page.scss'],
})
export class LandingpagePage implements OnInit {

  constructor(private us: UserServiceService,
              private router: Router) { }

  ngOnInit() {
  }

  public logout() {
    this.us.setUser('');
    this.router.navigate(['login']);
  }
}
