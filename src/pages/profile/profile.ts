import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Loading, ModalController } from 'ionic-angular';
import { AuthProvider } from '@fma_providers/auth/auth';
import { MediaProvider } from '@fma_providers/media/media';
import { LandingPage } from '@fma_pages/landing/landing';
import { ENV } from '@fma_env';
import { APIGatewayProvider } from '@fma_providers/api-gateway/api-gateway';
import { FmaAvatarEditorComponent } from '@fma_components/fma-avatar-editor/fma-avatar-editor';
import { ImagePicker, OutputType } from '@ionic-native/image-picker';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  public title: string = 'profile';
  public profile: any = {};
  public loading: Loading;

  @ViewChild('avatarImg') avatarImg: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, public loader: LoadingController,
    public modalCtrl: ModalController,
    private auth: AuthProvider, private data: APIGatewayProvider,
    private media: MediaProvider,
    private imagePicker: ImagePicker) {

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

    this.auth.getCreds()
      .then((creds: any) => {
        var profile = creds.subscriber;

        this.media.getAvatar(profile)
          .then(response => {
            // profile.avatarData = response;

            // return this.populateProfile(profile);

            var result = response;
          })
          .catch(error => {
            var message = error;
          });

        return this.populateProfile(profile);
      })
      .catch((reason: any) => this.handleReject(reason));
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
    // this.navCtrl.push(FmaAvatarEditorComponent, { avatar: this.profile.avatar })
    // this.modalCtrl.create(FmaAvatarEditorComponent, { avatar: this.profile.avatar }, {
    //   enableBackdropDismiss: true,
    //   showBackdrop: true
    // }).present();

    var options = {
      maximumImagesCount: 1,
      outputType: OutputType.DATA_URL
    };

    this.imagePicker.getPictures(options)
      .then(results => this.refreshAvatar(results))
      .catch(error => {
        this.toastCtrl.create({
          dismissOnPageChange: true,
          message: error,
          showCloseButton: true
        }).present();
      });
  }

  refreshAvatar(result: any): Promise<any> {
    // Consider specifying characterset?
    // this.avatarImg.nativeElement.src = avatarData;
    this.profile.avatarData = result.data;

    return Promise.resolve();
  }

  update(): void {
    this.loading = this.loader.create({
      content: 'Updating profile...',
      dismissOnPageChange: true
    });
    this.loading.present();

    this.media.updateAvatar(this.profile)
      .then(result => this.data.updateSubscriber(this.profile))
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
