import * as admin from 'firebase-admin';
import { loadDeck } from '../../src/game/helper/load-card-deck';

const createGame = async (gameId: string, gameStatus, deckChoice: string = '') => {
  await admin.firestore().collection('games').doc(gameId).set(gameStatus);
  if (deckChoice !== '') { // small optimization as most tests don't require a deck
    await loadDeck({ gameId, deckChoice });
  }
};

export { createGame };
