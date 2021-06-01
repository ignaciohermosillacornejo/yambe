import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const addUserToGame = functions.https.onCall(async (data, context) => {
  functions.logger.info('Adding user to game - start');

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.',
    );
  }

  if (!data || !data.gameId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The param game id is invalid',
    );
  }

  const gameRef = admin
    .firestore()
    .collection('games')
    .doc(data.gameId);

  gameRef.update({
    players: admin.firestore.FieldValue.arrayUnion(context.auth.uid),
  });

  functions.logger.info('Adding user to game - success');

  return {
    result: 'success',
  };
});

// eslint-disable-next-line max-len
export const removeUserFromGame = functions.https.onCall(async (data, context) => {
  functions.logger.info('Removing user from game - start');

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.',
    );
  }

  if (!data || !data.gameId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The param game id is invalid',
    );
  }

  const gameRef = admin
    .firestore()
    .collection('games')
    .doc(data.gameId);

  gameRef.update({
    players: admin.firestore.FieldValue.arrayRemove(context.auth.uid),
  });

  functions.logger.info('Removing user from game - success');

  return {
    result: 'success',
  };
});
