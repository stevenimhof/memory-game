import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { MemoryCard } from '../../components/card/memory-card';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

  constructor(public navCtrl: NavController) {

  }

  quitGame() {
    this.navCtrl.setRoot(HomePage);
  }

  flip = function($event, className) {
    console.log($event);
    console.log(className);
	};

}
