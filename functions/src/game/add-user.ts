import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { isAuthed } from '../helper/auth';
import { validateGameData } from './helper/game-data-validation';

admin.initializeApp();

const addUserToGame = functions.https.onCall(async (data, context) => {
  functions.logger.info('Adding user to game - start');

  // validations
  isAuthed(context);
  validateGameData(data);

  const gameRef = admin
    .firestore()
    .collection('games')
    .doc(data.gameId);

  gameRef.update({
    players: admin.firestore.FieldValue.arrayUnion(context.auth?.uid),
  });

  functions.logger.info('Adding user to game - success');

  return {
    result: 'success',
  };
});

export { addUserToGame };
