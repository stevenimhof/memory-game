import { Component } from '@angular/core';
import { Player } from './player';
//import { HumanPlayer } from './humanPlayer';
//import { ComputerPlayer } from './computerPlayer';
//import { BoardChangeListener } from '../../providers/memory-game/boardChangeListener';
import { GameStateChangeListener } from '../../providers/memory-game/gameStateChangeListener';


@Component({
  selector: 'game',
  templateUrl: 'game.html'
})

export class Game {
  private board;
  private players: Player[];
  private currentPlayerIndex = 0;
  private listeners = [];

  constructor() {
    //this.board = board;

		//this.players[0] = new HumanPlayer("Player 1", board);
		//this.players[1] = new ComputerPlayer("Computer", board);
  }

  public setBoard(board) {
    this.board = board;
  }

  public getBoard() {
    return this.board.getBoard();
  }

  public getCurrentPlayer(): Player {
		return this.players[this.currentPlayerIndex];
	}

  public addGameStateChangeListener(listener): void {
		this.listeners.push(listener);
	}

  protected hasWinner(): boolean {
		return false;
	}

  //private gameFinished(): void {
		/*let winner = null;

		if (this.hasWinner()) {
			winner = this.getCurrentPlayer();
		}

		for (let listener of this.listeners) {
			listener.gameFinished(winner);
		}*/
    //return;
	//}
}
