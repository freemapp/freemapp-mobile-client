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
  templateUrl: 'fma-subscriber-item.html'
})
export class FmaSubscriberItemComponent {

  @Input() private subscriber: any;

  get coverImage(): any {
    return { 'background-image': `../../assets/imgs/${ this.subscriber.coverImage }` };
  }
  get avatar(): any {
    return `./assets/imgs/${ this.subscriber.coverImage }`;
  }

  constructor(public navCtrl: NavController) {

  }

  viewSubscriber() {
    // this.navCtrl.push(ItemPage, { subscriber: this.subscriber.subscriberid });
  }

}
