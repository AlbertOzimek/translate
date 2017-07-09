import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  user: Observable<firebase.User>;
  items: FirebaseListObservable<any>;
  name: any;
  msgVal = '';

  constructor(public afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.items = db.list('/messages', {
      query: {
        limitToLast: 5
      }
    });

    this.user = afAuth.authState;

    this.user.subscribe(auth => {
      if (auth) {
        this.name = auth;
      }
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  chatSend(theirMessage: string) {
    this.items.push({message: theirMessage, name: this.name.displayName});
    this.msgVal = '';
  }
}
