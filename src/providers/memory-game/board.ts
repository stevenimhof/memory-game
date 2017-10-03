
export class Board {
  private board = [];
  private listeners = [];

  constructor() {
    this.generateBoard();
  }

  public getBoard() {
    return this.board;
  }

  public addBoardChangeListener(ui): void {
		this.listeners.push(ui);
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

  private boardChanged(): void {
		for (let listener of this.listeners) {
			listener.boardChanged();
		}
	}

  private shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
  }
}
