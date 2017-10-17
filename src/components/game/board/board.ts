
<<<<<<< HEAD
const CARD_NAMES = 'abcdefghijklmnopqrstuvwxyz'.split('');
=======
const CARD_NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
>>>>>>> 1ce42ab42433b88f8585afb4738dd9fdad526ef4

export class Board {
  private board = [];
  private size;

  constructor(size) {
<<<<<<< HEAD
    this.size = size;
    this.generateBoard();
=======
    this.generateBoard(size);
>>>>>>> 1ce42ab42433b88f8585afb4738dd9fdad526ef4
  }

  public getBoard() {
    return this.board;
  }

<<<<<<< HEAD
  private generateBoard() {
    let usedCards = CARD_NAMES.filter((i, index) => (index < (this.size[0]*this.size[1])/2));
    let cardNames = usedCards.concat(usedCards);
=======
  private generateBoard(size) {
    let cardNames = CARD_NAMES.concat(CARD_NAMES);
>>>>>>> 1ce42ab42433b88f8585afb4738dd9fdad526ef4
    let cards = cardNames.map(n => ({
        name: n,
        isFlipped: false
        //url: `${environment.deployUrl}assets/${n}.png`
    }));

    this.shuffle(cards);
<<<<<<< HEAD
    for(let i = 0; i < this.size[0]; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.size[1]; j++) {
=======
    for(let i = 0; i < size / 2; i++) {
      this.board[i] = [];
      for (let j = 0; j < size / 2; j++) {
>>>>>>> 1ce42ab42433b88f8585afb4738dd9fdad526ef4
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
