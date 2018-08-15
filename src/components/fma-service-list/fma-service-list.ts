import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Generated class for the FmaServiceListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fma-service-list',
  templateUrl: 'fma-service-list.html'
})
export class FmaServiceListComponent {

  @Output('item-tapped') itemTappedEmitter: EventEmitter<any>;
  @Input() services: Observable<any>;

  constructor() {
    this.itemTappedEmitter = new EventEmitter<any>();
  }

  onItemTapped(event) {
    this.itemTappedEmitter.emit(event);
  }

}
