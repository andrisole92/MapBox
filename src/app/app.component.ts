import {Component, Input, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {AddParkingPage} from '../pages/add-parking/add-parking';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {map} from "rxjs/internal/operators";
import {auth} from "firebase";
import {ParkingLotPage} from "../pages/parking-lot/parking-lot";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  currentUser: any;

  pages: Array<{ title: string, component: any }>;
  lotsRef: AngularFireList<any>;
  lots: Observable<any[]>;
  photoUrl: string =  "";
  test: string = null;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Find Parking', component: HomePage}
    ];
    // showing user lots
    // window.auth = this.afAuth;
    // window.nav = this.nav;
    afAuth.user.subscribe((user) => {
      console.log(user);
      if (user && user.uid) {
        // this.photoUrl = user.photoURL;
        this.test = user.photoURL;
        this.currentUser = user;
        this.lotsRef = db.list('/lots', ref => ref.orderByChild('uuid').equalTo(user.uid));
        this.lots = this.lotsRef.snapshotChanges().pipe(
          map(actions =>
            actions.map(a => ({key: a.key, ...a.payload.val()}))
          )
        );
      } else {
        this.currentUser = null;


      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (this.nav.getActive().component !== page.component) this.nav.push(page.component);

  }

  addParking() {
    console.log('addParking');
    this.nav.push(AddParkingPage);


  }

  facebook(){
    let fb = new auth.FacebookAuthProvider();
    let gg = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(fb);
  }

  googleAuth(){
    let fb = new auth.FacebookAuthProvider();
    let gg = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(gg);
  }

  login() {
    let fb = new auth.FacebookAuthProvider();
    let gg = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(fb);
  }

  logout() {
    this.afAuth.auth.signOut();
    window.location.reload();

  }

  openLotPage(key: string) {
    console.warn('openLotPage ', key);
    this.nav.push(ParkingLotPage, {key})
  }

}
