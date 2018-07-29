import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LocationProvider} from "../../providers/location/location"
import {MapsAPILoader} from '@agm/core';
import {AngularFireAuth} from 'angularfire2/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('items')
  map: any;
  locs: any;
  items: any;
  location: any;

  constructor(public navCtrl: NavController,
              public locationService: LocationProvider,
              private mapsAPILoader: MapsAPILoader,
              public afAuth: AngularFireAuth) {
    // window.auth = afAuth;
    afAuth.user.subscribe(
      res => {
        console.log(res)
      },
      e => console.error(e)
    );
  }


  ngAfterViewInit() {
    this.createMap();
  }

  createMap() {
    // this.mapsAPILoader.load().then(() => {


    // });
    this.mapsAPILoader.load().then(() => {
      // let autocomplete = new google.maps.places.AutocompleteService();
      let input = <HTMLInputElement>document.querySelector('.locationSearch input');
      console.log(input)
      let autocomplete: any = new google.maps.places.Autocomplete(input);
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
      });
      let el = document.getElementById('map');
      let latlng = new google.maps.LatLng(-34.397, 150.644);
      let myOptions = {
        zoom: 8,
        center: latlng
      };
      this.map = new google.maps.Map(el, myOptions);
      // window.map = this.map;
    });

  }

  getItems(ev: any) {
    console.warn('getItems');

    // const val = ev.target.value;
    // this.items = [];
    // if (val === '') {
    //   this.items = [];
    //   return
    // }
    // this.locationService.getSomething(val).subscribe(
    //   res => {
    //     this.items = res[0];
    //     console.log(res)
    //   },
    //   e => console.error(e)
    // );
  }


  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
      'Bogota',
      'Bogota'
    ];
  }

}
