import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { expect } from '../chai.commons';
import { startLoggingStubs, stopLoggingStubs, resetLoggingStubs } from '../utils/logging-stubs';

import { testEnv } from '../utils/create-test-env';
// we must import functions after testEnv initialization
// eslint-disable-next-line import/order, import/first
import { removeUserFromGame } from '../../src/index';
import { createGame } from '../utils/create-game';
import { removeGame } from '../utils/remove-game';
import { newGameObject } from '../../src/game/helper/new-empty-game';

describe('removeUserFromGame', function () {
  let wrapped: any;
  const logStubs = {} as any;
  const gameId = 'testingGameId';

  before(async function () {
    startLoggingStubs(logStubs);
    await removeGame(gameId);
    wrapped = testEnv.wrap(removeUserFromGame);
  });

  after(function () {
    testEnv.cleanup();
    stopLoggingStubs(logStubs);
  });

  afterEach(async function () {
    await removeGame(gameId);
    resetLoggingStubs(logStubs);
  });

  it('should remove user from existing game and not adjust curremt player index', async function () {
    const newGame = newGameObject();
    const uid = 'uid';
    const data = { gameId };
    const context = {
      auth: { uid },
    };
    newGame.players = ['uid1', 'uid2', uid];
    newGame.currentPlayer = 0;
    await createGame(gameId, newGame);

    const res = await wrapped(data, context);

    expect(res).to.be.deep.equal({ result: 'success' });

    const snap = await admin
      .firestore()
      .collection('games')
      .doc(gameId)
      .get();

    const game = snap.data()!;

    expect(snap.data()).to.exist;
    expect(game.players).to.be.an('array').that.deep.equals(['uid1', 'uid2']);
    expect(game.currentPlayer).to.be.equal(0);
  });

  it('should remove user from existing game and adjust current player index', async function () {
    const newGame = newGameObject();
    const uid = 'uid';
    const data = { gameId };
    const context = {
      auth: { uid },
    };
    newGame.players = [uid, 'uid1', 'uid2'];
    newGame.currentPlayer = 1;
    await createGame(gameId, newGame);

    const res = await wrapped(data, context);

    expect(res).to.be.deep.equal({ result: 'success' });

    const snap = await admin
      .firestore()
      .collection('games')
      .doc(gameId)
      .get();

    const game = snap.data()!;

    expect(game).to.exist;
    expect(game.players).to.be.an('array').that.deep.equals(['uid1', 'uid2']);
    expect(game.currentPlayer).to.be.equal(0);
  });

  it('should remove user from existing game and delete game if user is the last player currently on the game', async function () {
    const newGame = newGameObject();
    const uid = 'uid';
    const data = { gameId };
    const context = {
      auth: { uid },
    };
    newGame.players = [uid];
    newGame.currentPlayer = 0;
    await createGame(gameId, newGame, 'test');

    const res = await wrapped(data, context);

    expect(res).to.be.deep.equal({ result: 'success - game deleted' });

    const snap = await admin
      .firestore()
      .collection('games')
      .doc(gameId)
      .get();

    const game = snap.data()!;

    expect(game).to.not.exist;
    expect(logStubs.info).to.be.calledWith('Removing user from game - deleting game');

    const gameDeckSnap = await admin
      .firestore()
      .collection('games')
      .doc(gameId)
      .collection('deck')
      .get();

    const gameDeck = gameDeckSnap.docs;

    expect(gameDeck).to.be.empty;
  });

  it('should throw unauthenticated exception if no valid uid is sent', async function () {
    const data = { gameId };
    const context = {};

    await expect(wrapped(data, context)).to.be.rejectedWith(functions.https.HttpsError);
  });

  it('should throw invalid-argument exception if no valid game data is sent', async function () {
    const data = { notGameIdParam: 'invalid' };
    const context = {
      auth: { uid: 'uid' },
    };

    await expect(wrapped(data, context)).to.be.rejectedWith(functions.https.HttpsError);
  });

  it('should throw not-found exception if game does not exist', async function () {
    const data = { gameId };
    const context = {
      auth: { uid: 'uid' },
    };

    await expect(wrapped(data, context)).to.be.rejectedWith(functions.https.HttpsError);
    expect(logStubs.info).to.be.calledWith('Removing user from game - game does not exist');
  });

  it('should throw permission-denied exception if user does not belong to game', async function () {
    const newGame = newGameObject();
    newGame.players = ['uid1', 'uid2'];
    newGame.currentPlayer = 0;
    await createGame(gameId, newGame);

    const data = { gameId };
    const context = {
      auth: { uid: 'uid' },
    };

    await expect(wrapped(data, context)).to.be.rejectedWith(functions.https.HttpsError);
    expect(logStubs.info).to.be.calledWith('Removing user from game - uid is not in the game');
  });
});
