import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the FmaServiceItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fma-service-item',
  templateUrl: 'fma-service-item.html',
  styles: [
    'fma-service-item.scss',
    'fma-service-icons.scss'
  ]
})
export class FmaServiceItemComponent {

  @Output('clicked') onClick: EventEmitter<any>;
  @Input() service: {
    name: string,
    icon: string
  };

  get iconClass(): string {
    return `fma-svc-icn-${ this.service.icon }`;
  }

  constructor(public navCtrl: NavController) {
    this.onClick = new EventEmitter<any>();
  }

  clicked(): void {
    this.onClick.emit(this.service);
  }

}
