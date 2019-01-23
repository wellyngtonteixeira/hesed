import { Component, ViewChild } from '@angular/core';
import {Nav, NavParams, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MembrosPage } from "../pages/membros/membros";
import { LoginPage } from "../pages/login/login";
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "../services/auth/auth.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;

  rootPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen
      , public auth: AuthService) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Membros', component: MembrosPage}
    ];

  }

  initializeApp() {
        this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          this.statusBar.styleDefault();
          this.splashScreen.hide();
          if(this.auth.autenticado){
            this.rootPage = "MembrosPage";
            //this.navCtrl.push("MembrosPage")
          }else{
            this.rootPage = "LoginPage"
          }
        });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }
}
