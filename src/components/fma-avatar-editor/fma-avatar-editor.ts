import { Component } from '@angular/core';
import { NavParams, NavController, ViewController } from 'ionic-angular';

/**
 * Generated class for the FmaAvatarEditorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fma-avatar-editor',
  templateUrl: 'fma-avatar-editor.html'
})
export class FmaAvatarEditorComponent {

  text: string;
  // avatar: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {
      this.text = 'fma-avatar-editor';
    // this.avatar = navParams.get('avatar');
  }

  dismiss(): void {
    // this.viewCtrl.dismiss(this.avatar);
  }

}
