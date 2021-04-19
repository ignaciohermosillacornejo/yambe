import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cards } from '../models/cards.interface';
import { Observable } from 'rxjs';

const CARDS_COLLECTION = 'cards';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public firestore: AngularFirestore
    ) { }

  public getCards(): Observable<Cards[]> {
    return this.getFirebaseCollection(CARDS_COLLECTION).valueChanges();
  }

  private getFirebaseCollection(collection: string): any {
    return this.firestore.collection(collection);
  }
}
