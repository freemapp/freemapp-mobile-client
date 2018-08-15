import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Auth } from "aws-amplify";
import { Observable } from 'rxjs';
import { DataProvider } from '../data/data';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public storage: Storage, private dataSvc: DataProvider) {

  }

  signIn(email: string, password: string): Observable<any> {
    return this.doAuthentication(email, password)
      .flatMap(() => this.doAuthorisation())
  }

  private doAuthentication(email: string, password: string): Observable<any> {
    return this.authenticate(email, password)
      .flatMap((creds: any) => this.authenticated(creds));
  }

  private authenticate(email: string, password: string) {
    return Observable.fromPromise(Auth.signIn(email, password));
  }

  private authenticated(creds: any): Observable<void> {
    let partialCreds: any = {
      username: creds.username,
      tokens: {
        id: creds.signInUserSession.idToken.jwtToken,
        refresh: creds.signInUserSession.refreshToken.token,
        access: creds.signInUserSession.accessToken.jwtToken
      }
    };

    return this.setCreds(partialCreds);
  }

  private doAuthorisation(): Observable<any> {
    return this.getCreds()
      .flatMap((creds: any) => this.authorise(creds.username))
      .flatMap((profile: any) => this.authorised(profile));
  }

  private authorise(subscriberid: string): Observable<any> {
    return this.dataSvc.getSubscriber(subscriberid);
  }

  private authorised(profile: any): Observable<any> {
    return this.setProfile(profile);
  }

  public getCreds(): Observable<any> {
    return Observable.fromPromise(this.storage.get('aws_creds'));
  }

  public getProfile(): Observable<any> {
    return Observable.fromPromise(this.storage.get('fma_profile'));
  }

  private setCreds(value: any): Observable<any> {
    return Observable.fromPromise(this.storage.set('aws_creds', value));
  }

  private setProfile(value: any): Observable<any> {
    return Observable.fromPromise(this.storage.set('fma_profile', value));
  }

}
