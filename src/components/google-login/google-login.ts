import { Component } from '@angular/core';

import { Platform } from "ionic-angular";
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

  constructor(private auth: AuthService, private platform: Platform) {}

googleLogin(){
    if(this.platform.is('cordova')){
      this.auth.nativeGoogleLogin();
    }else{
      this.auth.webGoogleLogin();
    }
}

signOut(){
    this.auth.signOut();
    if(this.platform.is('cordova')){
        this.auth.googleSignOut();
    }
}

}
