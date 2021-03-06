import { Component, ViewChild } from '@angular/core';
import { Loading, LoadingController, ToastController, NavController, Content, ScrollEvent } from 'ionic-angular';
import { Observable, Subject } from 'rxjs';

import { APIGatewayProvider } from '@fma_providers/api-gateway/api-gateway';
import { ServiceSubcribersPage } from '@fma_pages/service-subcribers/service-subcribers';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

  @ViewChild(Content) set content(element: Content) {
    element.ionScroll.subscribe((data: ScrollEvent) => {
      this.contentScroll.next(data);
    })
  };
  contentScroll: Subject<ScrollEvent>;
  loading: Loading;
  services: any;
  subscribers: any;
  error: any;

  constructor(private dataSvc: APIGatewayProvider, private loader: LoadingController,
    private toastCtrl: ToastController, public navCtrl: NavController) {

    this.contentScroll = new Subject<ScrollEvent>();
  }

  ionViewDidLoad() {
    this.fetchData();
  }

  fetchData() {
    this.loading = this.loader.create({ content: 'Fetching data...' });
    this.loading.present();

    this.getData().subscribe(
      result => {
        this.subscribers = result[0];
        this.services = result[1];

        this.loading.dismiss();
      },
      error => {
        this.toastCtrl.create({
          dismissOnPageChange: true,
          message: error,
          showCloseButton: true
        })
      });
  }

  getData(text?: string) {
    let mockSubs = [{
        subscriberid: "c204800f-0014-4a45-bbb6-45bd1b1f8704",
        email: "hanness@ovationsgroup.com",
        name: "Sennah Leopenaws",
        bio: "Aliquam scelerisque urna in tortor suscipit vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam scelerisque enim eget nibh sollicitudin pharetra.",
        services: [
          "plumbing"
        ]
      }, {
        subscriberid: "d0439ba0-12cf-4ec3-8cd4-3d0013e467a6",
        email: "that.other.guy.i.know@gmail.com",
        name: "Hannes Swanepoel",
        bio: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis vel massa eget nisl cursus eleifend ut ac urna.",
        services: [
          "electrician"
        ]
      }, {
        subscriberid: "02cf94db-dca7-45c3-b3af-1127151cdaa4",
        email: "finbergnico@gmail.com",
        name: "Nico Finberg",
        bio: "Praesent auctor orci at magna gravida aliquam. Phasellus malesuada sollicitudin neque, non dapibus purus posuere et. Mauris nisl eros, bibendum at nisi vitae, venenatis sodales purus.",
        services: [
          "aupair",
          "personal training"
        ]
      }];
    let mockSvcs = [{
        name: "tutor",
        icon: "tutor"
      }, {
        name: "mechanic",
        icon: "mechanic"
      }, {
        name: "plumbing",
        icon: "plumbing"
      }, {
        name: "diy",
        icon: "diy"
      }, {
        name: "personal training",
        icon: "personal-training"
      }, {
        name: "electrician",
        icon: "electrician"
      }, {
        name: "aupair",
        icon: "aupair"
      }, {
        name: "security",
        icon: "security"
      }
    ];
    // return Observable.combineLatest([
    //   Observable.of(mockSubs.filter(sub => !text || (sub.name.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) > -1 || sub.bio.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) > -1))),
    //   Observable.of(mockSvcs)
    // ]);
    return Observable.forkJoin([ this.dataSvc.getSubscribers(), this.dataSvc.getServices() ]);
  }

  onItemTapped(service) {
    this.navCtrl.push(ServiceSubcribersPage, { service: service });
  }

  onItemButtonTapped(subscriber) {
    // TODO: Navigate to "read only profile" page
    console.log('SUBSCRIBER', subscriber);
  }

  onDoSearch(searchText: string) {
    this.loading = this.loader.create({ content: 'Fetching data...' });
    this.loading.present();

    this.getData(searchText).subscribe(
      result => {
        this.subscribers = result[0];
        this.services = result[1];

        this.loading.dismiss();
      },
      error => {
        this.toastCtrl.create({
          dismissOnPageChange: true,
          message: error,
          showCloseButton: true
        })
      });
  }

}
