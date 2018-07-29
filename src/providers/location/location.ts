import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MapsAPILoader} from "@agm/core";
import {Observable} from "rxjs/Rx";

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {
  autocomplete: google.maps.places.AutocompleteService;
  geocoder: google.maps.Geocoder;

  constructor(public http: HttpClient, private mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.AutocompleteService();
      this.geocoder = new google.maps.Geocoder();
    });
  }

  getPlaceById(placeId: string, callback) {
    return this.geocoder.geocode({placeId: placeId}, callback)
  }


}
