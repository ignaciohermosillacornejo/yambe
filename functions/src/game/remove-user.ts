import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { isAuthed } from '../helper/auth';
import { validateGameData } from './helper/game-data-validation';

// eslint-disable-next-line max-len
export const removeUserFromGame = functions.https.onCall(async (data, context) => {
  functions.logger.info('Removing user from game - start');

  // validations
  isAuthed(context);
  validateGameData(data);

  const { uid } = context.auth!;

  const gameDoc = await admin
    .firestore()
    .collection('games')
    .doc(data.gameId)
    .get();

  if (!gameDoc.exists) {
    functions.logger.info('Removing user from game - game does not exist');
    throw new functions.https.HttpsError(
      'not-found',
      'The game your calling does not exist',
    );
  }

  const game = gameDoc.data()!;

  const playerIndex = game.players.indexOf(uid);

  if (playerIndex === -1) {
    functions.logger.info('Removing user from game - uid is not in the game');
    throw new functions.https.HttpsError(
      'permission-denied',
      'You can not remove yourself from a game your not in',
    );
  }

  if (game.players.length === 1) {
    functions.logger.info('Removing user from game - deleting game');
    await admin
      .firestore()
      .collection('games')
      .doc(data.gameId)
      .delete();
    return { result: 'success - game deleted' };
  }

  game.players = game.players.filter((player: string) => player !== uid);
  // if the removed user when before the current user in the array, we must update the index
  if (playerIndex < game.currentPlayer) {
    game.currentPlayer -= 1;
  }

  await admin
    .firestore()
    .collection('games')
    .doc(data.gameId)
    .set(game);

  functions.logger.info('Removing user from game - success');
  return {
    result: 'success',
  };
});
