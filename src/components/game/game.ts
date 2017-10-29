import { Component, Input } from '@angular/core';
import { Board } from './board/board';
import { Observable } from "rxjs";
import { HumanPlayer } from './player/humanPlayer';
import { ComputerPlayer } from './player/computerPlayer';
import { AppPreferences } from '@ionic-native/app-preferences';
import { sizeConverter } from '../../pages/settings/sizeConveter';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'game',
  templateUrl: 'game.html'
})

export class Game {
  @Input() mode;
  private board = null;
  private cardStack = [];
  private boardSize = sizeConverter[0];
  private leftCards;
  private players = [];
  private currentPlayerIndex;
  private boardOverlay = false;

  constructor(private appPreferences: AppPreferences, public alertCtrl: AlertController) {
    this.appPreferences.fetch('size').then((res) => {
      if(res != null){
        this.boardSize = sizeConverter[parseInt(res)];
      } else {
        // set default size
        this.boardSize = sizeConverter[0];
      }

      this.resetGame();
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
        Observable.timer(1000).subscribe(i => {
          this.cardStack[0].isHidden = true;
          this.cardStack[1].isHidden = true;
          // we have a match
          this.leftCards -= 2;
          console.log("left cards: " + this.leftCards);
          this.increaseScoreOfCurrentPlayer();

          if (this.leftCards === 0) {
            this.announceResult();
          }

          this.cardStack = [];
          this.setBoardOverlay(false);
        });
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

  private announceResult() {
    var title, text;
    if (this.hasWinner()) {
      title = 'Winner';
      text = 'The winner is ' + this.getWinner().getName();
    } else {
      title = 'Draw'
      text = 'It\'s a draw';
    }
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [{
        text: 'New game',
        handler: () => {
          this.resetGame();
        }
      }]
    });
    alert.present();
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
    for(let i = 0; i < this.boardSize[0]; i++) {
      for (let j = 0; j < this.boardSize[1]; j++) {
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

  private resetGame() {
    this.board = new Board(this.boardSize);
    this.leftCards = this.boardSize[0] * this.boardSize[1];
    this.currentPlayerIndex = 0;
    this.createPlayers();
  }

  private createPlayers() {
    this.players = [];
    console.log(this.mode);
    if(this.mode == 'pvp') {
      this.players.push(new HumanPlayer('Player 1', this.board));
      this.players.push(new HumanPlayer('Player 2', this.board));
    } else {
      this.players.push(new HumanPlayer('Player 1', this.board));
      this.players.push(new ComputerPlayer('Com', this.board));
    }
  }

}
