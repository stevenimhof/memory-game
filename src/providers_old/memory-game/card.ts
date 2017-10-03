import { Component } from '@angular/core';

/*@Component({
  selector: 'memory-card',
  template: 'memory-card.html'
})*/

export class Card {
  private isFlipped = false;

  flip = function() {
    this.isFlipped = !this.isFlipped;
	};
}
