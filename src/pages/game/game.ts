import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { Game } from '../../components/game/game';

import { AppPreferences } from '@ionic-native/app-preferences';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})

export class GamePage {
  game: Game;

  constructor(public navCtrl: NavController, private appPreferences: AppPreferences, public alertCtrl: AlertController) {
    this.initGame()
  }

  public quitGame() {
    this.navCtrl.setRoot(HomePage);
  }



  public initGame() {
    //let board = new Board();
		this.game = new Game(this.appPreferences, this.alertCtrl);
    //this.game.setBoard(board);
		//board.addBoardChangeListener(this);
		//this.game.addGameStateChangeListener(this);
  }




}
