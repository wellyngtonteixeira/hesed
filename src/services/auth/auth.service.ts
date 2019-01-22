import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Membro} from "../../models/membro/membro.model";
import {AngularFireAuth} from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import {GooglePlus} from "@ionic-native/google-plus";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import * as admin from "firebase-admin";
import {SERVICE_ACCOUNT_CREDENTIALS} from "../../app/serviceAccountCredentials";
import {AngularFireDatabase} from "@angular/fire/database";


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
              this.adminInicia(auth);
              const primeiro_acesso = this.db.object("membros/"+auth.email.replace(".", "%2E")).valueChanges()
              //signed in
              if(primeiro_acesso != null){
                  return this.primeiro_acesso(auth)
              }else{
                  return this.db.object("membros/"+auth.uid).valueChanges()
              }

          } else {
            /// not signed in
            return Observable.of(null)
          }
        })
        .subscribe(membro => {
          this.membro.next(membro)
        });
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
            //const token = {uid:, provider: provider, email:}
            //return this.afAuth.auth.signInWithCustomToken(token)
            //    .then()
            console.log("OK")
            return this.afAuth.auth.signInWithPopup(provider)
                .then(credential =>  {
                    this.updateMembro(credential.user)
                });
            //const provider = new firebase.auth.GoogleAuthProvider();
            //const credential = await this.afAuth.auth.signInWithPopup(provider);


        }catch (err) {
            console.log(err)
        }
    }

    public adminInicia(auth){
        const infos_adicionais = {
            email: auth.email
        }
        //conecta SDK ADMIN DO FIREBASE
        admin.initializeApp({
            credential: admin.credential.cert(SERVICE_ACCOUNT_CREDENTIALS),
            databaseURL: "https://hesed-e0cbf.firebaseio.com"
        });
        //CRIANDO TOKEN PERSONALIZADO PARA FINS DE CONTROLE DE USUÁRIOS
        admin.auth().createCustomToken(auth.uid, infos_adicionais)

    }
    //// Executa processo quando usuário acessa a primeira vez o app ////
private primeiro_acesso(user){
    const ref = this.db.database.ref("membros")
    ref.child(user.email.replace(".", "%2E")).once('value').then(
        function (snap) {
            var data = snap.val()
            data.key = user.uid
            var update = {}
            update[user.email.replace(".", "%2E")] = null
            update[user.uid] = data
            return ref.update(update)
        }
    )
    return this.db.object("membros/"+user.uid).valueChanges();

}
    /// updates database with user info after login
    /// only runs if user role is not already defined in database
    private updateMembro(authData) {
        const membroData = new Membro(authData)
        const ref = this.db.object("membros/"+authData.uid);
        ref.update(membroData);
    }

  signOut() {
    this.afAuth.auth.signOut()
  }

  googleSignOut(){
      this.gplus.logout()
  }

}
