
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENV } from '@fma_env';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  private imagesUrl: string = ENV.mediaUrls.images;
  private serviceIconsUrl: string = ENV.mediaUrls.serviceIcons;
  private avatarsUrl: string = ENV.mediaUrls.avatars;

  constructor(public http: HttpClient) {

  }

  public getImage(name: string): Observable<any> {
    return this.http.get(`${ this.imagesUrl }/${ name }`);
  }

  public getServiceIcon(name: string): Observable<any> {
    return this.http.get(`${ this.serviceIconsUrl }/${ name }`);
  }

  public getAvatar(name: string): Observable<any> {
    return this.http.get(`${ this.avatarsUrl }/${ name }`);
  }

}
