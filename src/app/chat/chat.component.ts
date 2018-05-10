import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  user: Observable<firebase.User>;
  items: AngularFireList<any>;
  name: any;
  msgVal = '';

  constructor(public afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.items = db.list('/messages');

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
