import { Component } from '@angular/core';
import {NavController, NavParams, Note} from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  // icons: string[];
  // itemsRef: AngularFireList<any>;
  // items: Observable<Note[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, db:AngularFireDatabase) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // this.itemsRef = db.list('books');
    // window.itemsRef = this.itemsRef;
    // window.items= this.itemsRef;
    // this.items = db.list('books').valueChanges();
    // window.items= this.items;

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(ListPage, {
    //   item: item
    // });
  }
}
