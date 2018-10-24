import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {finalize} from "rxjs/internal/operators";
import {AngularFireStorage} from "angularfire2/storage";

@IonicPage()
@Component({
  selector: 'page-my-files',
  templateUrl: 'my-files.html',
})
export class MyFilesPage {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string> = null;

  constructor(private storage: AngularFireStorage) {
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'files';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    )
      .subscribe()
  }
}
