import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the FmaSubscriberItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fma-subscriber-item',
  templateUrl: 'fma-subscriber-item.html',
  styles: [
    'fma-subscriber-item.scss',
    'fma-subscriber-avatars.scss',
    'fma-subscriber-covers.scss'
  ]
})
export class FmaSubscriberItemComponent {

  @Input() private subscriber: any;

  get coverClass(): string {
    return `fma-sub-cvr-${ this.subscriber.subscriberid }`;
  }
  get avatarClass(): string {
    return `fma-sub-avt-${ this.subscriber.subscriberid }`;
  }

  constructor(public navCtrl: NavController) {
    console.debug('construct fma-sub-itm');
  }

  viewSubscriber() {
    // this.navCtrl.push(ItemPage, { subscriber: this.subscriber.subscriberid });
  }

}
