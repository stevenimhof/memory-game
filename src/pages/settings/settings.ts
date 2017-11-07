import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { sizeConverter } from './sizeConveter';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

  difficulty: number = 1
  size: number = 1

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private appPreferences: AppPreferences) {
  	this.appPreferences.fetch('difficulty').then((res) => {
      if(res != null){
        this.difficulty = res;
      }
  	});

    this.appPreferences.fetch('size').then((res) => {
      if(res != null){
        this.size = res;
      }
    });
  }

  public getSizeConverter() {
    return sizeConverter;
  }

  public onDifficultyChange(): void {
  	this.appPreferences.store('difficulty', this.difficulty.toString());
  }

  public onSizeChange($event): void {
    this.appPreferences.store('size', this.size.toString());
  }

}
