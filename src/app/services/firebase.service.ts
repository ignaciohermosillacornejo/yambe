import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Card } from '../models/card.interface';
import { Observable } from 'rxjs';

const CARDS_COLLECTION = 'cards';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public firestore: AngularFirestore
    ) { }

  public getCards(): Observable<Card[]> {
    return this.getFirebaseCollection(CARDS_COLLECTION).valueChanges();
  }

  private getFirebaseCollection(collection: string): any {
    return this.firestore.collection(collection);
  }
}
