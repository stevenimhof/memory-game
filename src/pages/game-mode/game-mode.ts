import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GamePage } from '../game/game';

@Component({
  selector: 'page-game-mode',
  templateUrl: 'game-mode.html'
})
export class GameModePage {

  constructor(public navCtrl: NavController) {

  }

  goToGame(modus) {
  	this.navCtrl.setRoot(GamePage);
  }

}
