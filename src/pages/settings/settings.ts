import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  difficulty: number = 2

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private appPreferences: AppPreferences) {
  	this.appPreferences.fetch('difficulty').then((res) => { 
  		this.difficulty = res;
  		console.log("fetched:" + res); 
  	});
  }

  public onDifficultyChange(): void {

  	this.appPreferences.store('difficulty', this.difficulty.toString()).then((res) => { console.log("stored:" + res);});
  }

}
