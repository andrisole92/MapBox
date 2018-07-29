import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Rx";
import {MapsAPILoader} from "@agm/core";

/**
 * Generated class for the ParkingLotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-parking-lot',
  templateUrl: 'parking-lot.html',
})
export class ParkingLotPage {
  lots: Observable<any[]>;
  lot: Observable<any>;
  map: google.maps.Map;
  formatted_address: string;
  price: string;
  point: [number, number];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase,
              private mapsAPILoader: MapsAPILoader,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkingLotPage ', this.navParams.get('key'));
    let key = this.navParams.get('key');
    this.lot = this.db.object('lots/' + key).valueChanges();
    // window.lot = this.lot;
    this.lot.subscribe((lot) => {
      // listening for updates on a lot
      if (lot.location) {
        let {location} = lot;
        if (location.formatted_address) this.formatted_address = location.formatted_address;
        if (location.point) {
          this.point = location.point;
          this.createMap()

        }
        if (lot.price) this.price = lot.price;
      }
    });
  }

  createMap() {
    this.mapsAPILoader.load().then(() => {
      let el = document.getElementById('miniMap');
      let latlng = new google.maps.LatLng(this.point[0], this.point[1]);
      let myOptions = {
        zoom: 8,
        center: latlng
      };
      this.map = new google.maps.Map(el, myOptions);
      let marker = new google.maps.Marker({
        position: latlng,
        map: this.map
      });
    });

  }

}
