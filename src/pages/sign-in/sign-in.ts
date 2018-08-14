import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { ActivatePage } from '../activate/activate';
import { ResetPage } from '../reset/reset';
import { LandingPage } from '../landing/landing';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  loading: Loading;
  email: string = '';
  password: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loader: LoadingController, public toastCtrl: ToastController,
    private auth: AuthProvider) {
  }

  ionViewDidLoad() {

  }

  signIn() {
    this.loading = this.loader.create({
      content: 'Signing in...',
      dismissOnPageChange: true
    });
    this.loading.present();
    // this.navCtrl.setRoot(LandingPage);
    this.auth.signIn(this.email, this.password).subscribe(
      (value: any) => this.signedIn(value),
      (reason: any) => this.handleReject(reason));
  }

  signedIn(value: any) {
    if (value.challengeName === 'NEW_PASSWORD_REQUIRED') {
      // Force change password
      this.toastCtrl.create({
        message: 'Invalid user configuration.',
        showCloseButton: true,
        dismissOnPageChange: true
      }).present();
      this.loading.dismiss();
    } else {
      this.navCtrl.setRoot(LandingPage);
    }
  }

  handleReject(reason: any) {
    if (reason.code === 'UserNotFoundException') {
      // No such user
    } else if (reason.code === 'NotAuthorizedException') {
      // Incorrect password
    } else if (reason.code === 'UserNotConfirmedException') {
      // E-mail not verified
    }

    this.toastCtrl.create({
      message: reason.message,
      showCloseButton: true,
      dismissOnPageChange: true
    }).present();
    this.loading.dismiss();
  }

  newUser() {
    this.navCtrl.push(SignUpPage, { email: this.email });
  }

  forgotPassword() {
    this.navCtrl.push(ResetPage, { email: this.email });
  }

  verifyEmail() {
    this.navCtrl.push(ActivatePage, { email: this.email });
  }
}
