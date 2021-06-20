import * as admin from 'firebase-admin';
import { removeDeck } from './remove-deck';
import { removePlayerHands } from './remove-player-hands';

const removeGame = async (gameId: string) => {
  const removeGamePromise = admin.firestore().collection('games').doc(gameId).delete();
  const removeDeckPromise = removeDeck(gameId);
  const removePlayerHandsPromise = removePlayerHands(gameId);
  await Promise.all([
    removeGamePromise,
    removeDeckPromise,
    removePlayerHandsPromise,
  ]);
};

export { removeGame };
