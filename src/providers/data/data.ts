import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV } from '@fma_env';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public http: HttpClient) {
  }

  searchSubscribers(criteria?: string): Promise<any> {
    let filter = {
      search: criteria
    };

    return this.http.get(`${ ENV.dataUrls.subscribers }`, { params: filter }).toPromise();
  }

  getSubscribers(filter?: any): Promise<any> {
    filter = filter || {};
    filter.svc = filter.svc || '*';

    return this.http.get(`${ ENV.dataUrls.subscribers }`, { params: filter }).toPromise();
  }

  getSubscriber(subscriberid: string): Promise<any> {
     return this.http.get(`${ ENV.dataUrls.subscribers }/${ subscriberid }`).toPromise();
  }

  updateSubscriber(subscriber: any): Promise<any> {
    delete subscriber.avatarData;

    let apiParameters = { // OPTIONAL
      headers: {
        'content-type': 'application/json'
      },
      response: true
    };

    return this.http.put(`${ ENV.dataUrls.subscribers }/${ subscriber.subscriberid }`, subscriber, apiParameters).toPromise();
  }

  getServices(filter?: any): Promise<any> {
    return this.http.get(`${ ENV.dataUrls.services }`, { params: filter }).toPromise();
  }

  getService(name: string): Promise<any> {
    return this.http.get(`${ ENV.dataUrls.services }/${ name }`).toPromise();
  }

}
