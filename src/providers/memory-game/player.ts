export abstract class Player {
  private name;
	private board;

  constructor(name, board) {
		this.name = name;
		this.board = board;
	}

	public getName() {
		return name;
	}

  //protected makeMove(position: any): void {
		//placeMark(position, this);
	//}

	//protected isComputer(): boolean {
		//if (this instanceof ComputerPlayer) {
	//		return true;
		//}
		//return false;
	//}
}
