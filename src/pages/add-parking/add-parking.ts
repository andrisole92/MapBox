import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MapsAPILoader} from '@agm/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Rx";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the AddParkingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-parking',
  templateUrl: 'add-parking.html',
})
export class AddParkingPage {

  lotsRef: AngularFireList<any>;
  lots: Observable<any[]>;

  private location: any = null;
  private price: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mapsAPILoader: MapsAPILoader,
              db: AngularFireDatabase,public afAuth: AngularFireAuth) {
    this.lotsRef = db.list('lots');
    this.lots = db.list('lots').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddParkingPage');

  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {

      let input: HTMLInputElement = <HTMLInputElement>document.getElementById('searchTextField').children[0];
      let autocomplete:any


        = new google.maps.places.Autocomplete(input);
      autocomplete.setFields(
        ['formatted_address', 'geometry', 'place_id', 'name']);
      autocomplete.addListener('place_changed', () => {
        let place = autocomplete.getPlace();
        this.location = {
          formatted_address: place.formatted_address,
          name: place.name,
          place_id: place.place_id,
          point: [place.geometry.location.lat(), place.geometry.location.lng()]
        };
      })
    });
  }

  addNewLot() {
    if (this.location === null) return;
    if (this.price === null) return;
    this.lotsRef.push({uuid: this.afAuth.auth.currentUser.uid, location: this.location, price: "10", currency: "EUR"})
  }
}
