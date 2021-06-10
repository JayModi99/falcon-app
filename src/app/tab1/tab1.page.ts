import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  engineerName: any;

  constructor(
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    Storage.get({ key: 'engineerName' })
    .then((result: any) => {
      this.engineerName = result.value;
    });
  }

  logout(){
    this.authService.logout();
  }

}
