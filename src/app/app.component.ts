import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import * as firebase from'firebase';
import { AuthPage } from '../pages/auth/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
settingsPage:any = SettingsPage;
authPage:any = AuthPage;
  @ViewChild('content') content: NavController;
  isAuth: boolean;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      let config = {
        apiKey: "AIzaSyCPeEtL5OqU-PZVNPJqj-XR62AR4I6D_IQ",
        authDomain: "cd-livres-appli.firebaseapp.com",
        databaseURL: "https://cd-livres-appli.firebaseio.com",
        projectId: "cd-livres-appli",
        storageBucket: "cd-livres-appli.appspot.com",
        messagingSenderId: "480872330410"
      };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
            this.content.setRoot(TabsPage);
          } else {
            this.isAuth = false;
            this.content.setRoot(AuthPage, {mode: 'connect'});
          }
        }
      );
    });
    
  }
  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }
  onNavigate(page: any, data?: {}) {
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
}
}