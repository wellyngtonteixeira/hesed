import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Membro} from "../../models/membro/membro.model";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireDatabase} from "@angular/fire/database";
import * as firebase from 'firebase/app';
import {GooglePlus} from "@ionic-native/google-plus";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

/*
  Generated class for the AuthService provider.

  See https://angular.io/guide/dependency-injection for more info on services
  and Angular DI.
*/
@Injectable()
export class AuthService {

  membro: BehaviorSubject<Membro> = new BehaviorSubject(null)

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private gplus: GooglePlus) {
    this.afAuth.authState
        .switchMap(auth => {
          if (auth) {
            /// signed in
            return this.db.object('membros/' + auth.uid).valueChanges()
          } else {
            /// not signed in
            return Observable.of(null)
          }
        })
        .subscribe(membro => {
          this.membro.next(membro)
        })
    //console.log('Hello AuthService Provider');
  }

  ///// SignIn - SignOut Process /////

  /*googleLogin() {

  }*/


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
            const provider = new firebase.auth.GoogleAuthProvider()
            return this.afAuth.auth.signInWithPopup(provider)
                .then(credential =>  {
                    this.updateMembro(credential.user)
                })
            //const provider = new firebase.auth.GoogleAuthProvider();
            //const credential = await this.afAuth.auth.signInWithPopup(provider);

        }catch (err) {
            console.log(err)
        }
    }

    //// Update user data ////

    /// updates database with user info after login
    /// only runs if user role is not already defined in database
    private updateMembro(authData) {
        const membroData = new Membro(authData)
        const ref = this.db.object('membros/' + authData.uid);
        ref.update(membroData);
    }

  signOut() {
    this.afAuth.auth.signOut()
  }

  googleSignOut(){
      this.gplus.logout()
  }

}
