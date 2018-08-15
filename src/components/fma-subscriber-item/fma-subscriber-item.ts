import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  @Output('clicked') onClick: EventEmitter<any>;
  @Input() private subscriber: any;

  get coverClass(): string {
    return `fma-sub-cvr-${ this.subscriber.subscriberid }`;
  }
  get avatarClass(): string {
    return `fma-sub-avt-${ this.subscriber.subscriberid }`;
  }

  constructor(public navCtrl: NavController) {
    this.onClick = new EventEmitter<any>();
  }

  onClicked() {
    this.onClick.emit(this.subscriber);
  }

}
