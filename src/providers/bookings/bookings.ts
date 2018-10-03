import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import Booking from "../../classes/Booking";

/*
  Generated class for the BookingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingsProvider {

  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    console.log('Hello BookingsProvider Provider');
  }


  // Making a new book as a Client for a particular lot
  // New booking is added to the firebase, and owner should receive a notification
  // TODO: Notification
  makeABookingAsAClient(booking: Booking){

  }

  getBookings(){}


  // subscribing too bookins for a certain lot.
  // Must be an owner of a lot
  //Retrieving all new and active bookins? No past bookins
  subscribeToActiveBookinsAsOwner(lotID){}

  // what is a booking

}
