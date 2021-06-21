import * as admin from 'firebase-admin';
import { dealAnswerCards } from '../../src/game/helper/deal-card';
import { loadDeck } from '../../src/game/helper/load-card-deck';

const createGame = async (
  gameId: string,
  gameStatus: any,
  deckChoice: string = '',
  dealCardsArgs: any = undefined,
) => {
  const gameRef = admin.firestore().collection('games').doc(gameId);
  await gameRef.set(gameStatus);
  if (deckChoice !== '') { // small optimization as most tests don't require a deck
    await loadDeck({ gameRef, deckChoice });
  }
  if (dealCardsArgs) {
    await dealAnswerCards(dealCardsArgs);
  }
};

export { createGame };
