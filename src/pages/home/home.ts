import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LocationProvider} from "../../providers/location/location"
import {MapsAPILoader} from '@agm/core';
import {AngularFireAuth} from 'angularfire2/auth';
import HTMLMarker from "../../classes/HTMLMarker";
import { AnimationService, AnimationBuilder } from 'css-animator';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',


})
export class HomePage {
  @ViewChild('myElement') myElem;
  private animator: AnimationBuilder;
  map: any = null;
  location: any;
  currentPosition: any = null;
  myLocationMarker: any = null;
  hState: string = 'inactive';

  constructor(public navCtrl: NavController,
              public locationService: LocationProvider,
              private mapsAPILoader: MapsAPILoader,
              public afAuth: AngularFireAuth,animationService: AnimationService) {
    this.animator = animationService.builder();

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
      let el = document.getElementById('map');
      let latlng = new google.maps.LatLng(-34.397, 150.644);
      let myOptions = {
        zoom: 8,
        center: latlng,
        disableDefaultUI: true
      };

      let styledMapType = new google.maps.StyledMapType(
        [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#242f3e"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#746855"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#242f3e"
              }
            ]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#d59563"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#d59563"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#263c3f"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#6b9a76"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#38414e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#212a37"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9ca5b3"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#746855"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#1f2835"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#f3d19c"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#2f3948"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#d59563"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#17263c"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#515c6d"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#17263c"
              }
            ]
          }
        ],
        {name: 'Styled Map'});

      this.map = new google.maps.Map(el, myOptions);
      this.map.mapTypes.set('styled_map', styledMapType);
      this.map.setMapTypeId('styled_map');
      this.myLocationMarker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: null,
        icon: "assets/imgs/combinedShape.png"
      });
      this.myLocationMarker.setVisible(false);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setCurrentPosition.bind(this));
      } else {
      }
      let input = <HTMLInputElement>document.querySelector('.locationSearch input');
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
        if (place.geometry.viewport) {
          this.map.fitBounds(place.geometry.viewport);
        } else {
          this.map.setCenter(place.geometry.location);
          this.map.setZoom(17);  // Why 17? Because it looks good.
        }
      });


      window['map'] = this.map;
    });

  }


  setCurrentPosition(position) {
    console.log('setCurrentPosition: ', position);
    this.currentPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
    console.log(this.currentPosition);
    if (this.map !== null) {
      this.map.setCenter(this.currentPosition);
    }
    this.drawLotMarker();
    if (this.myLocationMarker !== null) {
      this.myLocationMarker.setPosition(this.currentPosition)
      this.myLocationMarker.setVisible(true);
      this.myLocationMarker.setClickable(false);
      // if (this.myLocationMarker.getAnimation() !== null) {
      //   this.myLocationMarker.setAnimation(null);
      // } else {
      //   this.myLocationMarker.setAnimation(google.maps.Animation.BOUNCE);
      // }
    }
  }

  drawLotMarker() {

    let htmlMarker = new HTMLMarker(56.9561206, 24.33, "$10000", () => {
      console.log('click');
    });

    // console.log(priceMarker);
    htmlMarker.setMap(this.map);
  }

  toggleState() {
    console.log('toggleState');
    this.hState = this.hState === 'active' ? 'inactive' : 'active';

  }
  animationStarted(){
    console.log('animationStarted')



  }

  animationDone(){
    console.log('animationDone')
  }

}
