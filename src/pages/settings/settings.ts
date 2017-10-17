import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { sizeConverter } from './sizeConveter';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

  difficulty: number = 2
  size: number = 0

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private appPreferences: AppPreferences) {
  	this.appPreferences.fetch('difficulty').then((res) => {
      console.log("fetched difficulty:" + res);
      if(res != null){
        this.difficulty = res;
      }
      console.log("set difficulty:" + this.difficulty);
  	});
    console.log(sizeConverter);

    this.appPreferences.fetch('size').then((res) => {
      console.log("fetched field size:" + res);
      if(res != null){
        this.size = res;
      }
      console.log("set field size:" + this.size);
    });
  }

  public getSizeConverter() {
    return sizeConverter;
  }

  public onDifficultyChange(): void {
    console.log("new difficulty:" + this.difficulty);
  	this.appPreferences.store('difficulty', this.difficulty.toString());
  }

  public onSizeChange($event): void {
    console.log("new size:" + this.size);
    this.appPreferences.store('size', this.size.toString());
  }

}
