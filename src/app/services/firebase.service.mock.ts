import { Injectable } from '@angular/core';
import { CARDS_MOCK, QUESTION_CARD_MOCK } from '../mocks/card.mock';
import { Card } from '../models/card.interface';

@Injectable()
export class FirebaseServiceMock {

  constructor( ) { }

  public getDeck(): Promise<Card[]> {
    return Promise.resolve(CARDS_MOCK);
  }

  public getCurrentQuestionCard(): Promise<Card> {
    return Promise.resolve(QUESTION_CARD_MOCK);
  }

  private getFirebaseCollection(collection: string): any {
    return Promise.resolve();
  }
}
