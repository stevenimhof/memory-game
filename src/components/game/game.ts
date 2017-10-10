import { Component } from '@angular/core';
import { Board } from './board/board';
import { Observable } from "rxjs";
import { HumanPlayer } from './player/humanPlayer';
import { ComputerPlayer } from './player/computerPlayer';

@Component({
  selector: 'game',
  templateUrl: 'game.html'
})

export class Game {
  private board;
  private currentOpenCards = [];
  private leftCards = 12; // needs to be dynamic - change after adding settings
  private players = [];
  private currentPlayerIndex = 1;

  constructor() {
    this.board = new Board();
    this.players.push(new HumanPlayer('Player 1', this.board));
    this.players.push(new ComputerPlayer('Player 2', this.board));
  }

  public getBoard() {
    return this.board.getBoard();
  }

  public flipEvent($event) {
    this.currentOpenCards.push($event);
    console.log(this.currentOpenCards);
    if (this.currentOpenCards.length === 2) {

      // if current player is com then make a random move
      /*if (this.getCurrentPlayer() instanceof ComputerPlayer) {
        let cardIndex = this.getCurrentPlayer().getMove();
        Observable.timer(1000).subscribe(i => {
          this.currentOpenCards.push(cardIndex);
          this.flipCard(cardIndex);
        });
      }*/

      if (this.currentOpenCards[0].name === this.currentOpenCards[1].name) {
        // we have a match
        this.leftCards -= 2;
        this.increaseScoreOfCurrentPlayer();

        if (this.leftCards === 0) {
          this.announceResult();
        }

        this.currentOpenCards = [];
      } else {
        // wrong pair
        Observable.timer(1000).subscribe(i => {
          this.currentOpenCards[0].isFlipped = false;
          this.currentOpenCards[1].isFlipped = false;
          this.currentOpenCards = [];
          this.changeCurrentPlayer();
        });
      }
    }
  }

  private announceResult() {
    if (this.hasWinner()) {
      console.log('winner is ' + this.getWinner().getName());
    } else {
      console.log('its a draw');
    }
  }

  private changeCurrentPlayer() {
    this.currentPlayerIndex = Math.abs(this.currentPlayerIndex - 1);
  }

  private getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  private increaseScoreOfCurrentPlayer() {
    this.getCurrentPlayer().increaseScore();
  }

  private hasWinner() {
    if (this.players[0].getScore() != this.players[1].getScore())
      return true;
    return false;
  }

  private getWinner() {
    let winner;
    if (this.players[0].getScore() > this.players[1].getScore()) {
      winner = this.players[0];
    } else {
      winner = this.players[1];
    }
    return winner;
  }

  private flipCard(index) {
    let currentIndex = 0;
    for(let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        currentIndex++;
        if (currentIndex === index) {
          this.getBoard()[i][j].isFlipped = true;
        }
      }
    }
  }


}
