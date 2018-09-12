import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Auth } from 'aws-amplify';

/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

  title: string = 'reset password';
  email: string = '';
  code: string = '';
  confirmPassword: string = '';
  hasCode: boolean = false;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loader: LoadingController, public toastCtrl: ToastController) {
    if (navParams.data.email) this.email = navParams.data.email;
  }

  ionViewDidLoad() {

  }

  forgotPassword() {
    this.loading = this.loader.create({
      content: 'Sending reset code...',
      dismissOnPageChange: true
    });
    this.loading.present();

    Auth.forgotPassword(this.email).then(
      (value: any) => this.forgottenPassword(value),
      (reason: any) => this.handleReject(reason)
    );
  }

  forgottenPassword(value: any) {
    this.toastCtrl.create({
      message: 'Password reset code sent. Please check your e-mail.',
      dismissOnPageChange: false,
      showCloseButton: true
    }).present();
    this.loading.dismiss();
    this.hasCode = true;
  }

  resetPassword() {
    this.loading = this.loader.create({
      content: 'Resetting password...',
      dismissOnPageChange: true
    });
    this.loading.present();

    Auth.forgotPasswordSubmit(this.email, this.code, this.confirmPassword).then(
      (value: any) => this.resettedPassword(value),
      (reason: any) => this.handleReject(reason)
    );
  }

  resettedPassword(value: any) {
    this.toastCtrl.create({
      message: 'Password reset. Please sign-in.',
      dismissOnPageChange: false,
      showCloseButton: true
    }).present();
    this.loading.dismiss();
    this.navCtrl.pop();
  }

  handleReject(reason: any) {
    // InvalidParameterException - Could be unverified e-mail
    this.toastCtrl.create({
      message: reason.message,
      showCloseButton: true,
      dismissOnPageChange: true
    }).present();
    this.loading.dismiss();
  }

  haveCode() {
    this.hasCode = true;
  }

  cancel() {
    this.navCtrl.pop();
  }
}
