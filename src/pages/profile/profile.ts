import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { AuthProvider } from '@fma_providers/auth/auth';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  public title: string = 'profile';
  public profile: any = {};
  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, public loader: LoadingController,
    private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    this.loading = this.loader.create({
      content: 'Loading profile...',
      dismissOnPageChange: true
    });
    this.loading.present();

    this.auth.getCreds().then(
      (creds: any) => this.populateProfile(creds.subscriber),
      (reason: any) => this.handleReject(reason));
  }

  populateProfile(result: any): void {
    this.profile = result;

    this.loading.dismiss();
  }

  handleReject(reason: any): void {
    this.toastCtrl.create({
      message: reason,
      dismissOnPageChange: true,
      showCloseButton: true
    }).present();

    this.loading.dismiss();
  }

}
