
const CARD_NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export class Board {
  private board = [];

  constructor(size) {
    this.generateBoard(size);
  }

  public getBoard() {
    return this.board;
  }

  private generateBoard(size) {
    let cardNames = CARD_NAMES.concat(CARD_NAMES);
    let cards = cardNames.map(n => ({
        name: n,
        isFlipped: false
        //url: `${environment.deployUrl}assets/${n}.png`
    }));

    this.shuffle(cards);
    for(let i = 0; i < size / 2; i++) {
      this.board[i] = [];
      for (let j = 0; j < size / 2; j++) {
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
