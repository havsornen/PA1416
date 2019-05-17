import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { UserServiceService } from './user-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGateService implements CanActivate{

  constructor(private us: UserServiceService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.us.getUser()) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
