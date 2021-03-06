
const CARD_NAMES = 'abcdefghijklmnopqrstuvwxyz'.split('');

export class Board {
  private board;
  private size;

  constructor(size) {
    this.board = [];
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
        isFlipped: false,
        cardIndex: 0,
        url: `./assets/img/${n}.svg`
    }));

    this.shuffle(cards);

    let index = 0;
    for(let i = 0; i < this.size[0]; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.size[1]; j++) {
        cards[0].cardIndex = index;
        this.board[i][j] = cards[0];
        cards.shift();

        index++;
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
