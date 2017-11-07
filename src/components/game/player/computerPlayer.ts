import { Player } from './player';

export class ComputerPlayer extends Player {

  constructor(name, board) {
    super(name, board);
  }

  /*
    // fullCardStack, cardStack
    if (first move) {
      // do i know a pair?
      if (yes) {
        open first card
      } else {
        open new card
      }
    } else {
      // second move
      if (I know the missing card) {
        open card
      } else {
        open new card
      }
    }
  */
  public getMove(fullCardStack, cardStack) {
    var index;

    if (cardStack.length == 0) {

      index = this.getKnownPairInStack(fullCardStack);

      if (index && index.length == 2) {
        return index[0];
      } else {
        return this.getMoveForNewCard(fullCardStack);
      }
    } else {
      index = this.getMissingKnownCard(fullCardStack, cardStack);
      if(index !== false) {
        return index;
      } else {
        return this.getMoveForNewCard(fullCardStack);
      }
    }
  }

  private getMoveForNewCard(fullCardStack) {
    var movedCardIndex = 0;
    for(let i = 0; i < this.getBoard().length; i++) {
      for (let j = 0; j < this.getBoard()[i].length; j++) {
        if (!this.isIndexInStack(movedCardIndex, fullCardStack) && this.getBoard()[i][j].isFlipped == false) {
          return movedCardIndex;
        }
        movedCardIndex++;
      }
    }
  }

  private isIndexInStack(index, fullCardStack) {
    for(let i = 0; i < fullCardStack.length; i++) {
      if (fullCardStack[i][0] == index) {
        return true;
      }
    }
    return false;
  }

  private getKnownPairInStack(stack) {
    for(let i = 0; i < stack.length; i++) {
      for (let j = 0; j < stack.length; j++) {
        if (stack[i][1] == stack[j][1] && i != j) {
          return [stack[i][0], stack[j][0]];
        }
      }
    }
    return false;
  }

  private getMissingKnownCard(fullCardStack, stack) {
    for(let i = 0; i < fullCardStack.length; i++) {
      if (fullCardStack[i][1] == stack[0].name && fullCardStack[i][0] != stack[0].cardIndex) {
        return fullCardStack[i][0];
      }
    }
    return false;
  }

}
