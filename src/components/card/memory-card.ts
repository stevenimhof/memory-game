import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'memory-card',
  templateUrl: 'memory-card.html'
})
export class MemoryCard {
  isFlipped = false;

  constructor(public navCtrl: NavController) {

  }

  flip = function() {
    this.isFlipped = !this.isFlipped;
	};

}
