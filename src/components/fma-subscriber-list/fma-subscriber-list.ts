import { Component, Input } from '@angular/core';

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

  @Input() subscribers: any[];

  constructor() {

  }

}
