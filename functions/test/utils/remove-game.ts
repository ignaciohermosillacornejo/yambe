import * as admin from 'firebase-admin';
import { removeDeck } from './remove-deck';

const removeGame = async (gameId: string) => {
  const deleteDoc = admin.firestore().collection('games').doc(gameId).delete();
  const deleteDeck = removeDeck(gameId);
  await Promise.all([deleteDoc, deleteDeck]);
};

export { removeGame };
