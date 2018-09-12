import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Auth } from '../../../node_modules/aws-amplify';

/**
 * Generated class for the ActivatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-activate',
  templateUrl: 'activate.html',
})
export class ActivatePage {

  title: string = 'activate';
  email: string = '';
  code: string = '';
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loader: LoadingController, public toastCtrl: ToastController) {
    if (navParams.data.email) this.email = navParams.data.email;
  }

  ionViewDidLoad() {
  }

  verify() {
    this.loading = this.loader.create({
      content: 'Verifying...',
      dismissOnPageChange: true
    });
    this.loading.present();

    Auth.confirmSignUp(this.email, this.code).then(
      (value: any) => this.verified(value),
      (reason: any) => this.handleReject(reason)
    );
  }

  verified(value: any) {
    this.toastCtrl.create({
      message: 'E-mail verified. Please sign in.',
      dismissOnPageChange: false,
      showCloseButton: true
    }).present();
    this.navCtrl.pop();
  }

  resendCode() {
    this.loading = this.loader.create({
      content: 'Resending verification...',
      dismissOnPageChange: true
    });
    this.loading.present();

    Auth.resendSignUp(this.email).then(
      (value: any) => this.resendedSignup(value),
      (reason: any) => this.handleReject(reason)
    )
  }

  resendedSignup(value: any) {
    this.toastCtrl.create({
      message: 'Verification code sent. Please check your e-mail.',
      dismissOnPageChange: true,
      showCloseButton: true
    }).present();
    this.loading.dismiss();
  }

  handleReject(reason: any) {
    // NotAuthorizedException - already confirmed
    // UserNotFoundException - user doesn't exist
    this.toastCtrl.create({
      message: reason.message,
      showCloseButton: true,
      dismissOnPageChange: true
    }).present();
    this.loading.dismiss();
  }

  cancel() {
    this.navCtrl.pop();
  }

}
