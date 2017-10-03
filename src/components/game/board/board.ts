
export class Board {
  private board = [];

  constructor() {
    this.generateBoard();
  }

  public getBoard() {
    return this.board;
  }

  private generateBoard() {
    let symbols = ['A', 'B', 'C', 'D', 'E', 'F'];
    symbols = symbols.concat(symbols);
    this.shuffle(symbols);
    for(let i = 0; i < 3; i++) {
      this.board[i] = [];
      for (let j = 0; j < 4; j++) {
        this.board[i][j] = symbols[0];
        symbols.shift();
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
