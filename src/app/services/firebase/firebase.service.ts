import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { Card } from '../../models/card.interface';

const CARDS_COLLECTION = 'cards';
const GAMES_COLLECTION = 'games';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public firestore: AngularFirestore
    ) { }

  public async getDeck(): Promise<Card[]> {
    const cards = Array<Card>();
    this.firestore.collection(CARDS_COLLECTION).get().subscribe(
      { next: (querySnapshot: QuerySnapshot<DocumentData>) => {
        querySnapshot.forEach((doc: any) => {
          cards.push(doc.data());
        });
      },
    }
    );
    return cards;
  }

  public async validateGameId(gameId: string): Promise<boolean> { // 29fyY4af1DqbllTdd6Jy
    const docRef = this.firestore.doc(GAMES_COLLECTION + '/' + gameId).get()
    return docRef.toPromise().then((docSnapshot => {
        return docSnapshot.exists? true: false;
      }));
  }

  public async getCurrentQuestionCard(): Promise<Card> {
    return this.getFirebaseCollection('29fyY4af1DqbllTdd6Jy').doc('currentQuestionCard').get();
  }

  private getFirebaseCollection(collection: string): any {
    return this.firestore.collection(collection);
  }
}
