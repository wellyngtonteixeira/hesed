import { Component } from '@angular/core';

import {Platform, App, MenuController} from "ionic-angular";
import {AuthService} from "../../services/auth/auth.service";


/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {

  constructor(private auth: AuthService, private platform: Platform, public nav: App
  , public menu: MenuController) {

  }

googleLogin(){
    if(this.platform.is('cordova')){
      this.auth.nativeGoogleLogin()
          .then(() => {this.auth.setAutentica(true)
              this.nav.getActiveNav().setRoot("MembrosPage")
          });
    }else{
      this.auth.webGoogleLogin()
          .then(() => {this.auth.setAutentica(true)
              this.nav.getActiveNav().setRoot("MembrosPage")
          });
    }
}

signOut(){
    this.auth.signOut();
    if(this.platform.is('cordova')){
        this.auth.googleSignOut();
    }
    this.auth.setAutentica(false)
    this.nav.getActiveNav().setRoot("LoginPage")
        .then(value => {
            this.menu.toggle();
        })
    //this.nav.getActiveNav().;
}

}
