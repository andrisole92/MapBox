import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocationProvider } from '../providers/location/location';
import {AgmCoreModule} from "@agm/core";
import {AddParkingPage} from "../pages/add-parking/add-parking";
import {ParkingLotPage} from "../pages/parking-lot/parking-lot";
import {environment} from "../environments/environment";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from "angularfire2/auth";
import { AngularFireStorageModule } from 'angularfire2/storage';

import { BookingsProvider } from '../providers/bookings/bookings';
import {AnimatesDirective, AnimationService} from "css-animator";
import { AnimatorModule } from 'css-animator';
import { InAppBrowser } from '@ionic-native/in-app-browser';



@NgModule({
  declarations: [
    MyApp,
    AddParkingPage,
    HomePage,
    ParkingLotPage,
    ListPage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'parkin'),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AnimatorModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBH_9k7DQixteDaPBy8ZeN_djwAufCcS1U",
      libraries: ["places"]
    }),

    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddParkingPage,
    HomePage,
    ParkingLotPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationProvider,
    BookingsProvider,
    InAppBrowser
  ]
})
export class AppModule {}
