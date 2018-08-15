import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * Generated class for the FmaSubscriberListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fma-subscriber-list',
  templateUrl: 'fma-subscriber-list.html'
})
export class FmaSubscriberListComponent {

  @Output('button-tapped') buttonTappedEmitter: EventEmitter<any>;
  @Input() subscribers: any[];

  constructor() {
    this.buttonTappedEmitter = new EventEmitter<any>();
  }

  onButtonTapped(event) {
    this.buttonTappedEmitter.emit(event);
  }

}
