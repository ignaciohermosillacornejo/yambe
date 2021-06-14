import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { isAuthed } from '../helper/auth';
import { validateGameData } from './helper/game-data-validation';
import { removeGame } from './helper/remove-game';

export const removeUserFromGame = functions
  .runWith({
    timeoutSeconds: 5,
    memory: '256MB',
  })
  .https.onCall(async (data, context) => {
    functions.logger.info('Removing user from game - start');

    // validations
    isAuthed(context);
    validateGameData(data);

    const { uid } = context.auth!;
    const { gameId } = data;

    const gameDoc = await admin
      .firestore()
      .collection('games')
      .doc(gameId)
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
      await removeGame({ gameId });
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
      .doc(gameId)
      .set(game);

    functions.logger.info('Removing user from game - success');
    return {
      result: 'success',
    };
  });
