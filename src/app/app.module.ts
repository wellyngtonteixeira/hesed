import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MembrosPage } from "../pages/membros/membros";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FIREBASE_CREDENTIALS } from './firebase.credentials';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MembrosService } from '../services/membros/membros.service';
import { ToastService } from '../services/toast/toast.service';

import { Push } from '@ionic-native/push';
import {GooglePlus} from "@ionic-native/google-plus";
import {LoginPage} from "../pages/login/login";
import {GoogleLoginComponent} from "../components/google-login/google-login";
import {AngularFireAuthModule} from "@angular/fire/auth";
import { AuthService } from '../services/auth/auth.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MembrosPage,
    LoginPage,
    GoogleLoginComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [ 
    MyApp,
    HomePage,
    ListPage,
    MembrosPage,
    GoogleLoginComponent,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MembrosService,
    ToastService,
    Push,
    GooglePlus,
    AuthService
  ]
})
export class AppModule {}
