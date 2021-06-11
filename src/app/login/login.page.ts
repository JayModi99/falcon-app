/* eslint-disable max-len */
import { AuthenticationService } from '../service/authentication.service';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  /*eslint max-len: ["error", { "ignoreRegExpLiterals": true }]*/
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  emailBlur: boolean = false;
  passwordBlur: boolean = false;
  loginForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    if(this.authenticationService.isAuthenticated()){
      this.router.navigateByUrl('tab1');
    }
    else{
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        password: ['', Validators.required]
      });
    }
  }

  onEmailBlur(){
    this.emailBlur = true;
  }

  onPasswordBlur(){
    this.passwordBlur = true;
  }

  onForgotPasswordClick(){
    this.presentToast('Stay Calm & Try Again');
  }

  onLoginClick(){
    this.submitAttempt = true;
    if(this.loginForm.valid){
      this.presentLoading('Please wait...');
      const data: any = {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      };
      this.authenticationService.login(data)
      .subscribe((result: any) => {
        console.log(result);
        if(result.length === 0){
          this.presentToast('Invalid Credentials');
          this.loadingController.dismiss();
        }
        else{
          // Storage.set({
          //   key: 'engineerId',
          //   value: result[0].id,
          // });
          // Storage.set({
          //   key: 'engineerName',
          //   value: result[0].name,
          // });
          // Storage.set({
          //   key: 'engineerEmail',
          //   value: result[0].email,
          // });
          localStorage.setItem('engineerId', result[0].id);
          localStorage.setItem('engineerName', result[0].name);
          localStorage.setItem('engineerEmail', result[0].email);
          this.presentToast('Login Successful!');
          this.loadingController.dismiss();
          this.emailBlur = false;
          this.passwordBlur = false;
          this.submitAttempt = false;
          this.loginForm.reset();
          this.router.navigateByUrl('/tab1');
          this.authenticationService.authState.next(true);
        }
      },
      (error) => {
        this.presentToast('Failed to login');
        this.loadingController.dismiss();
      });
    }
  }

  async presentToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 3000,
      cssClass: 'custom-toast',
      animated: true,
      buttons: [
        {
          side: 'end',
          text: 'Close',
          role: 'cancel'
        }
      ]
    }).then((obj) => {
      obj.present();
    });
  }

  async presentLoading(msg) {
    this.loadingController.create({
      message: msg
    }).then((obj) => {
      obj.present();
    });
  }

}

// android:usesCleartextTraffic="true"
// android:windowSoftInputMode="adjustPan"
