import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Auth } from "aws-amplify";
import { Observable, Subscriber, Subject, Observer } from 'rxjs';
import { DataProvider } from '../data/data';
import { resolve } from 'path';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  credsChanged: Subject<any>;
  profileChanged: Subject<any>;

  constructor(public storage: Storage, private dataSvc: DataProvider) {
    this.credsChanged = new Subject<any>();
    this.profileChanged = new Subject<any>();
  }

  signIn(email: string, password: string): Promise<any> {
    return Auth.signIn(email, password)
      .then((authenticationCreds: any) => {
        return this.dataSvc.getSubscriber(authenticationCreds.username).toPromise()
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

  public getCreds$(): Observable<any> {
    return Observable.fromPromise(this.storage.get('fma_creds'));
  }

  public getCreds(): Promise<any> {
    return this.storage.get('fma_creds');
  }

  private setCreds$(value: any): Observable<any> {
    this.credsChanged.next(value);

    return Observable.fromPromise(this.storage.set('fma_creds', value));
  }

  private setCreds(value: any): Promise<any> {
    this.credsChanged.next(value);

    return this.storage.set('fma_creds', value);
  }

  private clearCreds$(value: any): Observable<any> {
    this.credsChanged.next(null);
    return Observable.fromPromise(this.storage.remove('aws_creds'));
  }

  private clearCreds(value: any): Promise<any> {
    this.credsChanged.next(null);
    return this.storage.remove('aws_creds');
  }

}
