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
  }

  async anonymousLogin(displayName: string) {
    const result = await this.fireAuth.signInAnonymously();
    const user = {
      uid: result.user.uid,
      displayName,
      photoURL: 'TODO',
    }
    localStorage.setItem('user', JSON.stringify(user));
  }

  public updateDisplayName(displayName: string) {
    const user = this.user;
    user.displayName = displayName;
    localStorage.setItem('user', JSON.stringify(user));
  }

  public get user(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public get isLogedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  public async signOut() {
    localStorage.removeItem('user');
    return this.router.navigate(['/']);
  }
}