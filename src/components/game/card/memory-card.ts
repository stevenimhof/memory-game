import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'memory-card',
  templateUrl: 'memory-card.html'
})
export class MemoryCard {
  @Input() info;
  @Output() flipEventCardToGame = new EventEmitter();

  constructor(public navCtrl: NavController) {
  }

  public flip() {
    if (!this.info.isFlipped) {
      this.info.isFlipped = true;
      this.flipEventCardToGame.emit(this.info);
    }
	}

  public setIsFlippedStatus(flag) {
    this.info.isFlipped = flag;
  }

  private hide() {
    this.info.isHidden = true;
  }

}
