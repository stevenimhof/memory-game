import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  difficulty: number = 2
  size: number = 8

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private appPreferences: AppPreferences) {
  	this.appPreferences.fetch('difficulty').then((res) => { 
      console.log("fetched difficulty:" + res); 
      if(res != null){
        this.difficulty = parseInt(res);
      }
      console.log("set difficulty:" + this.difficulty); 
  	});
    this.appPreferences.fetch('size').then((res) => { 
      console.log("fetched field size:" + res); 
      if(res != null){
        this.size = parseInt(res);
      }
      console.log("set field size:" + this.size); 
    });
  }

  public onDifficultyChange(): void {
  	this.appPreferences.store('difficulty', this.difficulty.toString());
  }

  public onSizeChange(): void {
    this.appPreferences.store('size', this.size.toString());
  }

}
