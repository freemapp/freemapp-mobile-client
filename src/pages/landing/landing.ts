import { Component } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { RequestOptionsArgs, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

  loading: Loading;
  services: any;
  subscribers: any;
  error: any;

  constructor(private http: Http, private loader: LoadingController) { }

  ionViewDidLoad() {
    this.loading = this.loader.create({ content: 'Fetching services...' });
    this.loading.present();

    // this.getData().subscribe(
    //     result => {
    //       this.subscribers = result[0];
    //       this.services = result[1];

    //       this.loading.dismiss();
    //     },
    //     error => {
    //       this.error = error;
    //     });

    setTimeout(() => {
      this.services = [{
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
      this.subscribers = [{
          subscriberid: "c204800f-0014-4a45-bbb6-45bd1b1f8704",
          email: "hanness@ovationsgroup.com",
          name: "Sennah Leopenaws",
          bio: "Donnigoewatjyniwilli",
          services: [
            "plumbing"
          ]
        }, {
          subscriberid: "d0439ba0-12cf-4ec3-8cd4-3d0013e467a6",
          email: "that.other.guy.i.know@gmail.com",
          name: "Hannes Swanepoel",
          bio: "Williwerki",
          services: [
            "electrician"
          ]
        }, {
          subscriberid: "02cf94db-dca7-45c3-b3af-1127151cdaa4",
          email: "finbergnico@gmail.com",
          name: "Nico Finberg",
          bio: "Droomgroot",
          services: [
            "aupair",
            "personal training"
          ]
        }];

      this.loading.dismiss();
    }, 180);
  }

  getData() {
    return Observable.forkJoin([ this.getSubscribers(), this.getServices() ]);
  }

  getServices() {
    let url: string = 'https://brblt7abh0.execute-api.us-east-2.amazonaws.com/dev/service';
    let method: string = "GET";

    let headers: Headers = new Headers();
    headers.append("content-type", "application/json");

    let options: RequestOptionsArgs = {
      method: method,
      url: url
    };

    return this.http.get(url, options)
      .map((response: Response) => response.json());
  }

  getSubscribers() {
    let url: string = 'https://dbep3uy1fc.execute-api.us-east-2.amazonaws.com/dev/subscriber';
    let method: string = "GET";
    let params = {
      svc: '*'
    }

    let headers: Headers = new Headers();
    headers.append("content-type", "application/json");

    let options: RequestOptionsArgs = {
      method: method,
      params: params,
      url: url
    };

    return this.http.get(url, options)
      .map((response: Response) => response.json());
  }

}
