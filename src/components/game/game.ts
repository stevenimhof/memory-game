import { Component, Input, ViewChildren, QueryList } from '@angular/core';
import { Board } from './board/board';
import { Observable } from "rxjs";
import { HumanPlayer } from './player/humanPlayer';
import { ComputerPlayer } from './player/computerPlayer';
import { AppPreferences } from '@ionic-native/app-preferences';
import { sizeConverter } from '../../pages/settings/sizeConveter';
import { difficultyConverter } from '../../pages/settings/difficultyConveter';

import { AlertController } from 'ionic-angular';
import { MemoryCard } from './card/memory-card';

@Component({
  selector: 'game',
  templateUrl: 'game.html'
})

export class Game {
  @ViewChildren(MemoryCard) cards: QueryList<MemoryCard>;
  @Input() mode;
  private board = null;
  private cardStack = [];
  private boardSize = sizeConverter[1];
  private leftCards;
  private players = [];
  private currentPlayerIndex;
  private boardOverlay = false;
  private difficulty = 0;
  private fullCardStack = [];
  private desiredStackSize = difficultyConverter[1];

  constructor(private appPreferences: AppPreferences, public alertCtrl: AlertController) {
    this.resetGame();
  }

  public getBoard() {
    return this.board.getBoard();
  }

  public flipEventCardToGame($event) {
    // busy wait - don't accept flip events during another flip event
    while(this.getBoardOverlay() === true) {}
    this.setBoardOverlay(true);

    // push card to stack
    this.cardStack.push($event);
    this.addToFullCardStack($event);

    // we have 2 open cards
    if (this.cardStack.length === 2) {

      if (this.cardStack[0].name === this.cardStack[1].name) {
        // we have a match
        Observable.timer(1000).subscribe(i => {
          this.cardStack[0].isHidden = true;
          this.cardStack[1].isHidden = true;

          this.leftCards -= 2;
          this.increaseScoreOfCurrentPlayer();

          if (this.leftCards === 0) {
            this.announceResult();
          } else {
            this.removeCardsFromFullCardStack(this.cardStack[0].name);
            this.cardStack = [];
          }

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
          if (this.getCurrentPlayer() instanceof ComputerPlayer) {
            this.makeComputerMove();
          }
        });
      }

    } else {
      this.setBoardOverlay(false);
    }
  }

  private addToFullCardStack(card) {
    /** bug: when checking for desired size later on, we're missing the correct order of the latest cards **/
    var exists = false;
    for(let i = 0; i < this.fullCardStack.length; i++) {
      if (this.fullCardStack[i][0] == card.cardIndex && this.fullCardStack[i][1] == card.name) {
        exists = true;
      }
    }

    if (!exists) {
      this.fullCardStack.push([card.cardIndex, card.name]);
    }

    this.fullCardStack = this.prepareFullCardStack(this.fullCardStack);
  }

  private prepareFullCardStack(stack) {
    if (stack.length <= this.desiredStackSize) {
      return stack;
    }

    return stack.slice(stack.length-this.desiredStackSize, stack.length);
  }

  private removeCardsFromFullCardStack(cardName) {
    for(let i = this.fullCardStack.length-1; i >= 0; i--) {
      if (this.fullCardStack[i][1] == cardName) {
        this.fullCardStack.splice(i, 1);
      }
    }
  }

  private makeComputerMove() {
    this.setBoardOverlay(true);

    var index = this.getCurrentPlayer().getMove(this.fullCardStack, this.cardStack);
    Observable.timer(1000).subscribe(i => {
      this.cards.toArray()[index].setIsFlippedStatus(true);
      this.cardStack.push(this.cards.toArray()[index].info);
      this.addToFullCardStack(this.cards.toArray()[index].info);

      Observable.timer(1000).subscribe(i => {
        var index = this.getCurrentPlayer().getMove(this.fullCardStack, this.cardStack);

        this.cards.toArray()[index].setIsFlippedStatus(true);
        this.cardStack.push(this.cards.toArray()[index].info);
        this.addToFullCardStack(this.cards.toArray()[index].info);

        // we have 2 open cards
        if (this.cardStack.length === 2) {

          if (this.cardStack[0].name === this.cardStack[1].name) {
            Observable.timer(1000).subscribe(i => {
              this.cardStack[0].isHidden = true;
              this.cardStack[1].isHidden = true;

              // we have a match
              this.leftCards -= 2;
              this.increaseScoreOfCurrentPlayer();

              if (this.leftCards === 0) {
                this.announceResult();
                this.setBoardOverlay(true);
              } else {
                this.removeCardsFromFullCardStack(this.cards.toArray()[index].info.name);
                this.cardStack = [];
                this.makeComputerMove();
              }

            });
          } else {
            // pair does not match
            Observable.timer(1000).subscribe(i => {
              this.cardStack[0].isFlipped = false;
              this.cardStack[1].isFlipped = false;
              this.cardStack = [];
              this.changeCurrentPlayer();
              this.setBoardOverlay(false);
            });
          }
        }
      });
    });
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

  /*private getCardByIndex(index) {
    let currentIndex = 0;
    for(let i = 0; i < this.boardSize[0]; i++) {
      for (let j = 0; j < this.boardSize[1]; j++) {
        currentIndex++;
        if (currentIndex === index) {
          return this.getBoard()[i][j];
        }
      }
    }
  }*/

  /*private flipCard(card) {
    card.isFlipped = true;
  }*/

  private getBoardOverlay() {
    return this.boardOverlay;
  }

  private setBoardOverlay(flag) {
    this.boardOverlay = flag;
  }

  private resetGame() {
    this.appPreferences.fetch('size').then((res) => {
      if(res != null){
        this.boardSize = sizeConverter[parseInt(res)];
      }

      this.appPreferences.fetch('difficulty').then((res) => {
        if (res != null) {
          this.difficulty = parseInt(res);
          this.desiredStackSize = difficultyConverter[parseInt(res)];
        }

        this.resetState();
      });

    });
  }

  private resetState() {  
    this.board = new Board(this.boardSize);
    this.boardOverlay = false;
    this.cardStack = [];
    this.fullCardStack = [];

    this.leftCards = this.boardSize[0] * this.boardSize[1];
    this.currentPlayerIndex = 0;
    this.createPlayers();
  }

  private createPlayers() {
    this.players = [];
    if(this.mode == 'pvp') {
      this.players.push(new HumanPlayer('Player 1', this.board));
      this.players.push(new HumanPlayer('Player 2', this.board));
    } else {
      this.players.push(new HumanPlayer('Player 1', this.board));
      this.players.push(new ComputerPlayer('Com', this.board));
    }
  }

}
