
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jssha from 'jssha';
import { ENV } from '@fma_env';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  constructor(public http: HttpClient) { }

  public getImageUrl(name: string): string {
    if (!!name)
      return `${ ENV.mediaUrls.images }/${ name }`;

    else
      return `${ ENV.mediaUrls.images }/logo2.png`;
  }

  public getImage(name: string): Observable<any> {
    let url = `${ ENV.mediaUrls.images }/${ name }`;
    let host = this.getUrlParts(url).host;
    let conentType = `image/${ this.getFileExtention(name) }`;
    // let getImageOptions = {
    //   headers: {
    //     'origin': 'localhost:8100',
    //     'host': host,
    //     'content-type': conentType,
    //     'cache-control': 'no-cahce',
    //     'x-fma-origin': 'DEVICE_ID'
    //   },
    //   observe: 'body',
    //   // params: { '': '' },
    //   // reportProgress: false,
    //   responseType: 'json',
    //   // withCredentials: false
    // };

    return this.http.get(url, {
      headers: {
        'origin': 'localhost:8100',
        'host': host,
        'content-type': conentType,
        'cache-control': 'no-cahce',
        'x-fma-origin': 'DEVICE_ID'
      },
      observe: 'body',
      // params: { '': '' },
      // reportProgress: false,
      responseType: 'text',
      // withCredentials: false
    });
  }

  public getServiceIconUrl(name: string): string {
    if (!!name)
      return `${ ENV.mediaUrls.serviceIcons }/${ name }`;

    else
      return `${ ENV.mediaUrls.serviceIcons }/DefaultUserIcon.png`;
  }

  public getServiceIcon(name: string): Observable<any> {
    return this.http.get(`${ ENV.mediaUrls.serviceIcons }/${ name }`);
  }

  public getAvatarUrl(profile: any): string {
    if (!!profile.avatar)
      return `${ ENV.mediaUrls.avatars }/${ profile.subscriberid }/${ profile.avatar }`;

    else
      return `${ ENV.mediaUrls.avatars }/eeb36ae0-c15d-49ce-99f4-9bcfdad26aef`;
  }

  public getCoverUrl(profile: any): string {
    if (!!profile.cover)
      return `${ ENV.mediaUrls.covers }/${ profile.subscriberid }/${ profile.cover }`;

    else
      return `${ ENV.mediaUrls.covers }/DefaultCover.png`;
  }

  public updateAvatar(profile: any): Promise<any> {
    const options = {
      headers: {
        'x-amz-content-sha256': this.hashBody(profile.avatarData)
      }
    };

    return this.http.put(`${ ENV.mediaUrls.avatars }/${ profile.subscriberid }/${ profile.avatar }`, profile.avatarData, options).toPromise();
  }

  private getFileName(name: string): string {
    return name.substring(0, name.lastIndexOf('.'));
  }

  private getFileExtention(name: string): string {
    return name.replace(`${ this.getFileName(name) }.`, '');
  }

  private getUrlParts(url: string): { protocol: string, host: string, path: string } {
    let urlMatches = url.match(/^(http|https):\/\/([\w\d\.-]*)(\/?[\w\d\.\/-]*)*\/?$/);

    return {
      protocol: urlMatches[1],
      host: urlMatches[2],
      path: urlMatches[3]
    };
  }

  private hashBody(body: any): string {
    const sha = new jssha('SHA-256', 'TEXT');
    sha.update(body);

    return sha.getHash('HEX');
  }

}
