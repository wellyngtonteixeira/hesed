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
      this.auth.GoogleAuth()
          .then(() => {
              this.nav.getActiveNav().setRoot("MembrosPage")
          });
    }else{
      this.auth.GoogleAuth()
          .then(() => {
              this.nav.getActiveNav().setRoot("MembrosPage")
          });
    }
}

async signOut(){
    this.auth.logout().then(() => {
        this.auth.autenticado = false;
        this.nav.getActiveNav().setRoot("LoginPage")
            .then(value => {
                this.menu.toggle();
            })
    });
}

}
