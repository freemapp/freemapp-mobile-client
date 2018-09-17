
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

  public getAvatarUrl(name: string): string {
    if (!!name)
      return `${ ENV.mediaUrls.avatars }/${ name }`;

    else
      return `${ ENV.mediaUrls.avatars }/DefaultUserIcon.png`;
  }

  public getAvatar(name: string): Observable<any> {
    return this.http.get(`${ ENV.mediaUrls.avatars }/${ name }`);
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

}
