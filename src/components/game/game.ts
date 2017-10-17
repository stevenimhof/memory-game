import { Component } from '@angular/core';
import { Board } from './board/board';
import { Observable } from "rxjs";
import { HumanPlayer } from './player/humanPlayer';
import { ComputerPlayer } from './player/computerPlayer';
import { AppPreferences } from '@ionic-native/app-preferences';
<<<<<<< HEAD
import { sizeConverter } from '../../pages/settings/sizeConveter';
=======
>>>>>>> 1ce42ab42433b88f8585afb4738dd9fdad526ef4

@Component({
  selector: 'game',
  templateUrl: 'game.html'
})

export class Game {
  private board;
  private currentOpenCards = [];
  private cardStack = [];
<<<<<<< HEAD
  private boardSize = sizeConverter[0];
  private leftCards;
=======
  private boardSize = 8
  private leftCards = 8
>>>>>>> 1ce42ab42433b88f8585afb4738dd9fdad526ef4
  private players = [];
  private currentPlayerIndex = 0;
  private boardOverlay = false;

  constructor(private appPreferences: AppPreferences) {
<<<<<<< HEAD
    this.appPreferences.fetch('size').then((res) => {
      if(res != null){
        this.boardSize = sizeConverter[parseInt(res)];
      }

      this.board = new Board(this.boardSize);
      this.leftCards = this.boardSize;
=======
    this.appPreferences.fetch('size').then((res) => { 
      if(res != null){
        this.boardSize = parseInt(res);
      }
      this.board = new Board(this.boardSize);
      this.leftCards = this.boardSize
>>>>>>> 1ce42ab42433b88f8585afb4738dd9fdad526ef4
      this.players.push(new HumanPlayer('Player 1', this.board));
      this.players.push(new ComputerPlayer('Player 2', this.board));
    });
  }

  public getBoard() {
    return this.board.getBoard();
  }

  private play() {
    this.getCurrentPlayer().makeMove();
  }

  public flipEvent($event) {
    // busy wait - don't accept flip events during another flip event
    while(this.getBoardOverlay() === true) {}
    this.setBoardOverlay(true);

    // push card to stack
    this.cardStack.push($event);

    // we have 2 open cards
    if (this.cardStack.length === 2) {

      if (this.cardStack[0].name === this.cardStack[1].name) {
        // we have a match
        this.leftCards -= 2;
        this.increaseScoreOfCurrentPlayer();

        if (this.leftCards === 0) {
          this.announceResult();
        }

        this.cardStack = [];
        this.setBoardOverlay(false);
      } else {
        // pair does not match
        Observable.timer(1000).subscribe(i => {
          this.cardStack[0].isFlipped = false;
          this.cardStack[1].isFlipped = false;
          this.cardStack = [];
          this.changeCurrentPlayer();
          this.setBoardOverlay(false);

          //is com turn?
          /*console.log(this.getCurrentPlayer());
          if (this.getCurrentPlayer() instanceof ComputerPlayer) {
            this.setBoardOverlay(true);

            var index = this.getCurrentPlayer().getMove();
            var card = this.getCardByIndex(index);
            Observable.timer(1000).subscribe(i => {
              this.flipCard(card);

              index = this.getCurrentPlayer().getMove();
              card = this.getCardByIndex(index);

              Observable.timer(1000).subscribe(i => {
                this.flipCard(card);
                this.setBoardOverlay(false);
              });
            });
          }*/

        });
      }

    } else {
      this.setBoardOverlay(false);
    }
  }

  /*public flipEvent___old($event) {

    // busy wait
    while(this.getBoardOverlay() === true) {}

    this.setBoardOverlay(true);

    this.currentOpenCards.push($event);
    console.log(this.currentOpenCards.length);
    if (this.currentOpenCards.length === 2) {

      // if current player is com then make a random move
      if (this.getCurrentPlayer() instanceof ComputerPlayer) {
        let index = this.getCurrentPlayer().getMove();
        let card = this.getCardByIndex(index);
        console.log(card);
        Observable.timer(1000).subscribe(i => {
          this.currentOpenCards.push(card);
          console.log(this.currentOpenCards);
          this.flipCard(card);
          this.setBoardOverlay(false);
        });
      }

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
          this.setBoardOverlay(false);
        });
      }
    } else {
      this.setBoardOverlay(false);
    }

    console.log(this.getBoardOverlay());
  }*/

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

  private getCardByIndex(index) {
    let currentIndex = 0;
<<<<<<< HEAD
    for(let i = 0; i < this.boardSize[0]; i++) {
      for (let j = 0; j < this.boardSize[1]; j++) {
=======
    for(let i = 0; i < this.boardSize / 2; i++) {
      for (let j = 0; j < this.boardSize / 2; j++) {
>>>>>>> 1ce42ab42433b88f8585afb4738dd9fdad526ef4
        currentIndex++;
        if (currentIndex === index) {
          return this.getBoard()[i][j];
        }
      }
    }
  }

  private flipCard(card) {
    card.isFlipped = true;
  }

  private getBoardOverlay() {
    return this.boardOverlay;
  }

  private setBoardOverlay(flag) {
    this.boardOverlay = flag;
  }


}
