import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { GameModePage } from '../game-mode/game-mode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  goToSettings() {
  	this.navCtrl.push(SettingsPage);
  }

  goToGameMode() {
  	this.navCtrl.push(GameModePage);
  }

}
