/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  // private url: string = 'http://localhost:8000/api/';
  private url: string = 'https://falcon-api.fi.tempcloudsite.com/api/';

  constructor(
    private http: HttpClient,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
   }

  ifLoggedIn() {
    // Storage.get({ key: 'engineerId' })
    // .then((result: any) => {
    //   if (result.value) {
    //     this.authState.next(true);
    //   }
    // });
    if (localStorage.getItem('engineerId')) {
      this.authState.next(true);
    }
  }

  login(data){
    return this.http.post(this.url + 'engineer/login', data);
  }

  logout() {
    // Storage.clear()
    // .then(() => {
    //   this.authState.next(false);
    // });
    localStorage.clear();
    this.authState.next(false);
  }

  isAuthenticated() {
    return this.authState.value;
  }

}
