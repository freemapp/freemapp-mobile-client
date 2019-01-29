import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Auth } from "aws-amplify";
import { Observable, Subscriber, Subject, Observer } from 'rxjs';
import { DataProvider } from '@fma_providers/data/data';
import { ENV } from '@fma_env';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  credsChanged: Subject<any>;

  constructor(private storage: Storage, private dataSvc: DataProvider) {
    this.credsChanged = new Subject<any>();
  }

  public signIn(email: string, password: string): Promise<any> {
    return Auth.signIn(email, password)
      .then((authenticationCreds: any) => {
        return this.dataSvc.getSubscriber(authenticationCreds.username)
          .then((subscriber: any) => {
            let newCreds: any = {
              username: authenticationCreds.username,
              tokens: {
                id: authenticationCreds.signInUserSession.idToken.jwtToken,
                refresh: authenticationCreds.signInUserSession.refreshToken.token,
                access: authenticationCreds.signInUserSession.accessToken.jwtToken
              },
              subscriber
            };

            return this.setCreds(newCreds);
          })
      });
  }

  public signOut(): Promise<any> {
    // return Auth.signOut().then(result => this.clearCreds());
    return this.clearCreds().then(result => Auth.signOut());
  }

  public getCreds$(): Observable<any> {
    if (ENV.isDebug) return Observable.of(JSON.parse(localStorage.getItem('fma_creds')));
    return Observable.fromPromise(this.storage.get('fma_creds'));
  }

  public getCreds(): Promise<any> {
    if (ENV.isDebug) return Promise.resolve(JSON.parse(localStorage.getItem('fma_creds')));
    return this.storage.get('fma_creds');
  }

  private setCreds$(value: any): Observable<any> {
    this.credsChanged.next(value);

    if (ENV.isDebug) {
      let parsedCreds = JSON.stringify(value);

      localStorage.setItem('fma_creds', parsedCreds);

      return Observable.of(parsedCreds);
    }
    return Observable.fromPromise(this.storage.set('fma_creds', value));
  }

  private setCreds(value: any): Promise<any> {
    this.credsChanged.next(value);

    if (ENV.isDebug) {
      let parsedCreds = JSON.stringify(value);

      localStorage.setItem('fma_creds', parsedCreds);

      return Promise.resolve(parsedCreds);
    }
    return this.storage.set('fma_creds', value);
  }

  private clearCreds$(): Observable<any> {
    this.credsChanged.next(null);

    if (ENV.isDebug) return Observable.of(localStorage.removeItem('fma_creds'));
    return Observable.fromPromise(this.storage.remove('fma_creds'));
  }

  private clearCreds(): Promise<any> {
    this.credsChanged.next(null);

    if (ENV.isDebug) return Promise.resolve(localStorage.removeItem('fma_creds'));
    return this.storage.remove('fma_creds');
  }

}
