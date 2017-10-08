import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SettingsPage } from '../pages/settings/settings';
import { GameModePage } from '../pages/game-mode/game-mode';
import { HomePage } from '../pages/home/home';
import { GamePage } from '../pages/game/game';

import { Game } from '../components/game/game';
import { MemoryCard } from '../components/game/card/memory-card';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppPreferences } from '@ionic-native/app-preferences';

class AppPreferencesMock extends AppPreferences {

  storage = {difficulty: 2}

  fetch(key) {
    return new Promise((resolve, reject) => {
      resolve(this.storage.difficulty);
    })
  }

  store(key, value){
    return new Promise((resolve, reject) => {
      this.storage.difficulty = parseInt(value);
      resolve(this.storage.difficulty);
    })
  }
}

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    GameModePage,
    HomePage,
    GamePage,
    Game,
    MemoryCard
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    GameModePage,
    HomePage,
    GamePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: AppPreferences, useClass: AppPreferencesMock},
    Game,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
