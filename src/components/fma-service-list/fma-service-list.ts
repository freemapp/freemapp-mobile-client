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

  @Output('item-clicked') onItemClicked: EventEmitter<any>
  @Input() services: Observable<any>;

  constructor() {
    this.onItemClicked = new EventEmitter<string>();
  }

  itemClicked(item) {
    this.onItemClicked.emit(item);
  }

}
