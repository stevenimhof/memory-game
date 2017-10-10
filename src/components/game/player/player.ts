export abstract class Player {
  private name;
  private board;
	private score;

  constructor(name, board) {
		this.name = name;
    this.board = board;
    this.score = 0;
	}

	public getName() {
		return this.name;
	}

  public getScore() {
    return this.score;
  }

  public increaseScore() {
    this.score += 1;
  }

  public getBoard() {
    return this.board.getBoard();
  }
}
