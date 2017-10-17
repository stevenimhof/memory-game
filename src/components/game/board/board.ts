
const CARD_NAMES = 'abcdefghijklmnopqrstuvwxyz'.split('');

export class Board {
  private board = [];
  private size;

  constructor(size) {
    this.size = size;
    this.generateBoard();
  }

  public getBoard() {
    return this.board;
  }

  private generateBoard() {
    let usedCards = CARD_NAMES.filter((i, index) => (index < (this.size[0]*this.size[1])/2));
    let cardNames = usedCards.concat(usedCards);
    let cards = cardNames.map(n => ({
        name: n,
        isFlipped: false
        //url: `${environment.deployUrl}assets/${n}.png`
    }));

    this.shuffle(cards);
    for(let i = 0; i < this.size[0]; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.size[1]; j++) {
        this.board[i][j] = cards[0];
        cards.shift();
      }
    }

    console.log(this.board);
  }

  private shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
  }
}
