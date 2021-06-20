import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { isAuthed } from '../helper/auth';
import { validateGameData } from './helper/game-data-validation';
import { newGameObject } from './helper/new-empty-game';
import { loadDeck } from './helper/load-card-deck';
import { dealCards } from './helper/deal-card';

/**
 * Adds user to game, if game doesn't exist it creates one before adding the user
 * to it
 */
const addUserToGame = functions.https.onCall(async (data, context) => {
  functions.logger.info('Adding user to game - start');

  // validations
  isAuthed(context);
  validateGameData(data);

  const { uid } = context.auth!;
  const { gameId, deckChoice } = data;
  const gameRef = admin.firestore().collection('games').doc(gameId);

  const gameDoc = await gameRef.get();

  // if game exists, we get it's data, otherwise we get a new game object
  let game;
  if (gameDoc.exists) {
    game = gameDoc.data()!;
  } else {
    game = newGameObject();
    await loadDeck({ gameRef, deckChoice });
  }

  if (game.players.includes(uid)) {
    functions.logger.info('Adding user to game - repeated user');
    return { result: 'user already added' };
  }

  // we insert the new player just before the current player, this way he'll
  // play after all other players currently in the game
  game.players = [
    ...game.players.slice(0, game.currentPlayer),
    uid,
    ...game.players.slice(game.currentPlayer),
  ];

  // if the game has no players, the new currentPlayer will be at index 0,
  // else it will increase by 1
  game.currentPlayer = (game.currentPlayer !== null) ? game.currentPlayer + 1 : 0;

  // we update/create the game with the new player
  await gameRef.set(game);

  // now that the player is part of the game, we give him his starting hand cards
  await dealCards({
    gameRef, userId: uid, numberOfCards: 8, type: 'answer',
  });

  functions.logger.info('Adding user to game - success');

  return {
    result: 'success',
  };
});

export { addUserToGame };
