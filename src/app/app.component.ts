import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private router: Router,
    private platform: Platform,
    private authenticationService: AuthenticationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();

      this.authenticationService.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['tab1']);
        } else {
          this.router.navigate(['login']);
        }
      });

    });
  }

}
