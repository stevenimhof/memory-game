import { Component } from '@angular/core';
import { Board } from './board/board';

@Component({
  selector: 'game',
  templateUrl: 'game.html'
})

export class Game {
  private board;

  constructor() {
    this.board = new Board();
  }

  public getBoard() {
    return this.board.getBoard();
  }


}
