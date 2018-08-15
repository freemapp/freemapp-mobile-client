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

  @Output('item-clicked') onItemClicked: EventEmitter<any>;
  @Input() subscribers: any[];

  constructor() {
    this.onItemClicked = new EventEmitter<any>();
  }

  itemClicked(item) {
    this.onItemClicked.emit(item);
  }

}
