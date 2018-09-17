import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Loading, ModalController } from 'ionic-angular';
import { AuthProvider } from '@fma_providers/auth/auth';
import { MediaProvider } from '@fma_providers/media/media';
import { LandingPage } from '@fma_pages/landing/landing';
import { ENV } from '@fma_env';
import { DataProvider } from '@fma_providers/data/data';
import { FmaAvatarEditorComponent } from '@fma_components/fma-avatar-editor/fma-avatar-editor';

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
    public modalCtrl: ModalController,
    private auth: AuthProvider, private data: DataProvider, private media: MediaProvider) {

    this.auth.credsChanged.subscribe(creds => {
      if (!creds)
        this.navCtrl.setRoot(LandingPage);
    });

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

  promptAvatar(): void {
    this.navCtrl.push(FmaAvatarEditorComponent, { avatar: this.profile.avatar })
    // this.modalCtrl.create(FmaAvatarEditorComponent, { avatar: this.profile.avatar }, {
    //   enableBackdropDismiss: true,
    //   showBackdrop: true
    // }).present();
  }

  update(): void {
    this.loading = this.loader.create({
      content: 'Updating profile...',
      dismissOnPageChange: true
    });
    this.loading.present();

    if (!this.profile.avatar) this.profile.avatar = 'cat.jpg';
    if (!this.profile.cover) this.profile.cover = 'dog.jpg';

    this.data.updateSubscriber(this.profile.subscriberid, this.profile)
      .then(result => {
        this.toastCtrl.create({
          dismissOnPageChange: true,
          message: 'Profile updated',
          showCloseButton: true
        }).present();
        this.loading.dismiss();
      })
      .catch(error => {
        this.toastCtrl.create({
          dismissOnPageChange: true,
          message: error,
          showCloseButton: true
        }).present();
        this.loading.dismiss();
      });
  }

}
