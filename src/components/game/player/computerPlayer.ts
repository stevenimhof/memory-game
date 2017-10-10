import { Player } from './player';

export class ComputerPlayer extends Player {
  constructor(name, board) {
    super(name, board);
  }

  public getMove() {
    let movedCardIndex = 0;
    for(let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (!this.getBoard()[i][j].isFlipped) {
          movedCardIndex++;
        }
      }
    }
    return movedCardIndex;
  }
}
