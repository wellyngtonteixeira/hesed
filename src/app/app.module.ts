import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
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
import {AngularFireAuthModule} from "@angular/fire/auth";
import { AuthService } from '../services/auth/auth.service';
import {MembrosPageModule} from "../pages/membros/membros.module";
import {LoginPageModule} from "../pages/login/login.module";
import {ComponentsModule} from "../components/components.module";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
      MembrosPageModule,
      LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [ 
    MyApp,
    MembrosPage,
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
    AuthService,
      MembrosPage,
      LoginPage
  ]
})
export class AppModule {}
