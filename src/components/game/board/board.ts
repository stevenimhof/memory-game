
const CARD_NAMES = ['A', 'B', 'C', 'D', 'E', 'F'];

export class Board {
  private board = [];

  constructor() {
    this.generateBoard();
  }

  public getBoard() {
    return this.board;
  }

  private generateBoard() {
    let cardNames = CARD_NAMES.concat(CARD_NAMES);
    let cards = cardNames.map(n => ({
        name: n,
        isFlipped: false
        //url: `${environment.deployUrl}assets/${n}.png`
    }));

    this.shuffle(cards);
    for(let i = 0; i < 3; i++) {
      this.board[i] = [];
      for (let j = 0; j < 4; j++) {
        this.board[i][j] = cards[0];
        cards.shift();
      }
    }
  }

  private shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
  }
}
