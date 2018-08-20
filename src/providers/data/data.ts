import { Injectable } from '@angular/core';
import { API } from "aws-amplify";
import { Observable } from '../../../node_modules/rxjs';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor() {
  }

  searchSubscribers(criteria?: string): Observable<any> {
    let filter = {
      search: criteria
    };

    let subscribersPromise = API.get('subscribers', `/`, { response: false, queryStringParameters: filter });

    return Observable.fromPromise(subscribersPromise);
  }

  getSubscribers(filter?: any): Observable<any> {
    filter = filter || {};
    filter.svc = filter.svc || '*';

    let subscribersPromise = API.get('subscribers', `/`, { response: false, queryStringParameters: filter });

    return Observable.fromPromise(subscribersPromise);
  }

  getSubscriber(subscriberid: string): Observable<any> {
    let subscriberPromise = API.get('subscribers', `/${ subscriberid }`, { response: false });

    return Observable.fromPromise(subscriberPromise);
  }

  getServices(filter?: any): Observable<any> {
    let servicesPromise = API.get('services', `/`, { response: false, queryStringParameters: { filter } });

    return Observable.fromPromise(servicesPromise);
  }

  getService(name: string): Observable<any> {
    let servicePromise = API.get('services', `/${ name }`, { response: false });

    return Observable.fromPromise(servicePromise);
  }

}
