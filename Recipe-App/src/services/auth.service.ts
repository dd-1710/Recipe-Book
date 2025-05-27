import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggingStatus = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggingStatus.asObservable()

  constructor() { }

  login(){
    sessionStorage.setItem('isLoggedIn','true');
    this.loggingStatus.next(true);
  }

  logout(){

    sessionStorage.removeItem('isLoggedIn');
    this.loggingStatus.next(false);
  }
}
