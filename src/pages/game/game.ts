import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { Game } from '../../components/game/game';


@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})

export class GamePage {
  game: Game;

  constructor(public navCtrl: NavController) {
    this.initGame();
  }

  public quitGame() {
    this.navCtrl.setRoot(HomePage);
  }



  public initGame() {
    //let board = new Board();
		this.game = new Game();
    //this.game.setBoard(board);
		//board.addBoardChangeListener(this);
		//this.game.addGameStateChangeListener(this);
  }




}
