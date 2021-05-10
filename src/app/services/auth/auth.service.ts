import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

 // Sign in with Google
  googleAuth() {
    return this.authLogin(new firebase.default.auth.GoogleAuthProvider);
  }

    
  // Auth logic to run auth providers
  private async authLogin(provider) {
    try {
      const result = await this.fireAuth.signInWithPopup(provider);
      console.log('LOGED IN!');
      this.updateUserData(result.user);
      console.log(result);
    } catch (error) {
      window.alert(error);
    }
  }

  get isLogedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  public async signOut() {
    await this.fireAuth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(user: firebase.default.User) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(data, { merge: true });
  }


}