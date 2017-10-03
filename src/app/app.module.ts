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
    Game,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
