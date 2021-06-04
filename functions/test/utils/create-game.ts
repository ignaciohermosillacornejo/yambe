import * as admin from 'firebase-admin';

const createGame = async (gameId: string, gameStatus) => {
  await admin.firestore().collection('games').doc(gameId).set(gameStatus);
};

export { createGame };
