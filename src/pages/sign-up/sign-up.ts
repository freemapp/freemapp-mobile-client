import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, ToastController } from 'ionic-angular';
import { Auth } from '../../../node_modules/aws-amplify';
import { ActivatePage } from '../activate/activate';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage
{

  loading: Loading;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loader: LoadingController, public toastCtrl: ToastController) {
      if (navParams.data.email) this.email = navParams.data.email;
    }

  ionViewDidLoad()
  {

  }

  cancel()
  {
    this.navCtrl.pop();
  }

  signUp()
  {
    this.loading = this.loader.create({
      content: 'Signing up...',
      dismissOnPageChange: true
    });
    this.loading.present();

    let newUser = {
      username: this.email,
      password: this.confirmPassword,
      locale: 'en_ZA',
      zoneinfo: 'Africa/Johannesburg'
    };

    Auth.signUp(newUser).then(
      (value: any) => this.signedUp(value),
      (reason: any) => this.handleReject(reason));
  }

  signedUp(value: any)
  {
    this.toastCtrl.create({
      message: 'Account registered. Check your e-mail for a verification code.',
      showCloseButton: true,
      dismissOnPageChange: false
    }).present();

    this.navCtrl.pop();
    this.navCtrl.push(ActivatePage, { email: this.email });
  }

  handleReject(reason: any)
  {
    if (reason.code === 'UsernameExistsException')
    {
      this.toastCtrl.create({
        message: 'This e-mail address is already registered. Recover password?',
        showCloseButton: true,
        dismissOnPageChange: false
      }).present();
      this.loading.dismiss();
    } else
    {
      this.toastCtrl.create({
        message: reason.message,
        showCloseButton: true
      }).present();
      this.loading.dismiss();
    }

  }

}
