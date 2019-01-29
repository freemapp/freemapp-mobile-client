import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, ToastController } from 'ionic-angular';
import { DataProvider } from '@fma_providers/data/data';

/**
 * Generated class for the ServiceSubcribersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-service-subcribers',
  templateUrl: 'service-subcribers.html',
})
export class ServiceSubcribersPage {

  loading: Loading;
  subscribers: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loader: LoadingController, private toastCtrl: ToastController,
    private dataSvc: DataProvider) {
  }

  ionViewDidLoad() {
    this.loading = this.loader.create({ content: 'Fetching subscribers...' });
    this.loading.present();

    let service = this.navParams.data.service;

    this.dataSvc.getSubscribers({ svc: service.name })
      .then(result => {
          this.subscribers = result;

          this.loading.dismiss();
      })
      .catch(error => {
        this.toastCtrl.create({
          dismissOnPageChange: true,
          message: error,
          showCloseButton: true
        })
      });
  }

  onItemButtonTapped(subscriber) {
    // TODO: Navigate to "read only profile" page
    console.log('SUBSCRIBER', subscriber);
  }

}
