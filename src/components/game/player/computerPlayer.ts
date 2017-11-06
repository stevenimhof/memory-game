import { Player } from './player';

export class ComputerPlayer extends Player {
  constructor(name, board) {
    super(name, board);
  }

  public getMove() {
    return this.getRandomMove();
  }

  private getRandomMove() {
    var indexes = [];
    var movedCardIndex = 0;
    for(let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (!this.getBoard()[i][j].isFlipped) {
          indexes.push(movedCardIndex);
        }
        movedCardIndex++;
      }
    }
    return indexes[Math.floor(Math.random()*indexes.length)];
  }

}
