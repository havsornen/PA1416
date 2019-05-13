import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private user: BehaviorSubject<any>;

  constructor() {
    this.user = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('loggedUser')));
  }

  public setUser(userValue) {
    localStorage.setItem('loggedUser', JSON.stringify(userValue));
    this.user.next(userValue);
  }

  public getUser() {
    return this.user.value;
  }

}
