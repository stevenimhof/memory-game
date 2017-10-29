import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

import { Game } from '../../components/game/game';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})

export class GamePage {
  private mode = null;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
     this.mode = navParams.get('mode');
  }

  public quitGame() {
    this.navCtrl.setRoot(HomePage);
  }
}
