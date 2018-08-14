import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the FmaServiceItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fma-service-item',
  templateUrl: 'fma-service-item.html'
})
export class FmaServiceItemComponent {

  @Input() service: { name: string };

  constructor(public navCtrl: NavController) {
  }

  get getAvatar(): string {
    return `./assets/imgs/${ this.service.name }.png`;
  }

  navService(): void {

  }

}
