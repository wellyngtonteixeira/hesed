import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

import { GooglePlus } from "@ionic-native/google-plus";
import { Platform } from "ionic-angular";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import {Membro} from "../../models/membro/membro.model";
import {AngularFireDatabase} from 'angularfire2/database';


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

  //user: Observable<firebase.User>
    user: BehaviorSubject<Membro> = new BehaviorSubject(null)

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private gplus: GooglePlus, private platform: Platform) {
      this.afAuth.authState
          .switchMap(auth => {
              if (auth) {
                  /// signed in
                  return this.db.object('membros/' + auth.uid)
              } else {
                  /// not signed in
                  return Observable.of(null)
              }
          })
          .subscribe(user => {
              this.user.next(user)
          })
      //this.user = this.afAuth.authState;
  }

googleLogin(){
    if(this.platform.is('cordova')){
      this.nativeGoogleLogin();
    }else{
      this.webGoogleLogin();
    }
}

async nativeGoogleLogin(): Promise<void>{


      this.gplus.login({
        'webClientId' : '343522721815-kh8ogg3bgi6sqqnmva1vq2mdcb1eh483.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'

      }).then(res=>{
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
            .then(suc=>{
                alert("LOGADO COM SUCESSO");
            }).catch(ns=>{
              alert("FALHA AO LOGAR")
        })
      })

}

async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);

    }catch (err) {
      console.log(err)
    }
}

signOut(){
    this.afAuth.auth.signOut();
    if(this.platform.is('cordova')){
      this.gplus.logout();
    }
}

}
