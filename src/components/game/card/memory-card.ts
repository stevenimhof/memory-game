import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { Game } from '../../providers/memory-game/game';

@Component({
  selector: 'memory-card',
  templateUrl: 'memory-card.html'
})
export class MemoryCard {
  @Input() content;
  isFlipped = false;

  constructor(public navCtrl: NavController) {

  }

  flip = function() {
    this.isFlipped = !this.isFlipped;
	};

}
