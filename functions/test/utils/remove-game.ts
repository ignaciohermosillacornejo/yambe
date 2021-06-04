import * as admin from 'firebase-admin';

const removeGame = async (gameId: string) => admin.firestore().collection('games').doc(gameId).delete();

export { removeGame };
