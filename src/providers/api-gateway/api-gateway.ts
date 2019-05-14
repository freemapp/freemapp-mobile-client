import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Amplify } from 'aws-sdk';
import { ENV } from '@fma_env';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class APIGatewayProvider {

  constructor(public http: HttpClient) {
    
  }

  public getSubscribers(filter?: any): Promise<any> {
    filter = filter || {};

    return this.http.get(`${ ENV.dataUrls.subscribers }`, { params: filter }).toPromise();
  }

  public getSubscriber(subscriberid: string): Promise<any> {
     return this.http.get(`${ ENV.dataUrls.subscribers }/${ subscriberid }`).toPromise();
  }

  public updateSubscriber(subscriber: any): Promise<any> {
    delete subscriber.avatarData;

    let apiParameters = { // OPTIONAL
      headers: {
        'content-type': 'application/json'
      },
      response: true
    };

    return this.http.put(`${ ENV.dataUrls.subscribers }/${ subscriber.subscriberid }`, subscriber, apiParameters).toPromise();
  }

  public getServices(filter?: any): Promise<any> {
    return this.http.get(`${ ENV.dataUrls.services }`, { params: filter }).toPromise();
  }

  public getService(name: string): Promise<any> {
    return this.http.get(`${ ENV.dataUrls.services }/${ name }`).toPromise();
  }
}