import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root'})
export class AuthService {

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,

  ) {
    /** Save user data in browser localstorage when
     * logged in and null when logged out
     */
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async anonymousLogin(displayName: string) {
    const result = await this.fireAuth.signInAnonymously();
    const user = result.user;
    const data = {
      uid: user.uid,
      displayName,
      photoURL: 'TODO',
    }
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    userRef.set(data, { merge: true });
  }
    
  get isLogedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  public async signOut() {
    await this.fireAuth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(data) {

  }


}