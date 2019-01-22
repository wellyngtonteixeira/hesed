import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SplashScreen} from "@ionic-native/splash-screen";
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "../../services/auth/auth.service";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public nav: NavController, public navParams: NavParams, public auth: AuthService) {
      if(this.auth.membro.value != null){
        this.nav.push("MembrosPage")
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
