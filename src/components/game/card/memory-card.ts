import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'memory-card',
  templateUrl: 'memory-card.html'
})
export class MemoryCard {
  @Input() info;
  @Output() flipEvent = new EventEmitter();

  constructor(public navCtrl: NavController) {
  }

  flip = function() {
    if (!this.info.isFlipped) {
      this.info.isFlipped = true;
      this.flipEvent.emit(this.info);
    }
	};

  private hide() {
    this.info.isHidden = true;
  }

}
