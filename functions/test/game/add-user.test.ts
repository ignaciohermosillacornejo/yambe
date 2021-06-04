import * as admin from 'firebase-admin';
import { expect } from '../chai.commons';
import { startLoggingStubs, stopLoggingStubs, resetLoggingStubs } from '../utils/logging-stubs';

import { testEnv } from '../utils/create-test-env';
// we must import functions after testEnv initialization
// eslint-disable-next-line import/order, import/first
import { addUserToGame } from '../../src/index';
import { createGame } from '../utils/create-game';
import { removeGame } from '../utils/remove-game';
import { newGameObject } from '../../src/game/helper/new-empty-game';

describe('addUserToGame', function () {
  let wrapped: any;
  const logStubs = {} as any;
  const gameId = 'testingGameId';

  before(async function () {
    startLoggingStubs(logStubs);
    await removeGame(gameId);
    wrapped = testEnv.wrap(addUserToGame);
  });

  after(function () {
    testEnv.cleanup();
    stopLoggingStubs(logStubs);
  });

  afterEach(async function () {
    await removeGame(gameId);
    resetLoggingStubs(logStubs);
  });

  it('should create game and add user when game is not created', async function () {
    const uid = 'uid';
    const data = { gameId };
    const context = {
      auth: { uid },
    };

    const res = await wrapped(data, context);

    expect(res).to.be.deep.equal({ result: 'success' });

    const snap = await admin
      .firestore()
      .collection('games')
      .doc(gameId)
      .get();

    const game = snap.data()!;
    expect(game).to.exist;
    expect(logStubs.info).to.be.calledWith('Adding user to game - success');
    expect(game.players).to.be.an('array').that.deep.equals([uid]);
    expect(game.currentPlayer).to.be.equal(0);
  });

  it('should add user to game that already exists with no other players', async function () {
    await createGame(gameId, newGameObject());

    const uid = 'uid';
    const data = { gameId };
    const context = {
      auth: { uid },
    };

    const res = await wrapped(data, context);

    expect(res).to.be.deep.equal({ result: 'success' });

    const snap = await admin
      .firestore()
      .collection('games')
      .doc(gameId)
      .get();

    const game = snap.data()!;

    expect(game).to.exist;
    expect(logStubs.info).to.be.calledWith('Adding user to game - success');
    expect(game.players).to.be.an('array').that.deep.equals([uid]);
    expect(game.currentPlayer).to.be.equal(0);
  });

  it('should not add user to game again if user is already in that game', async function () {
    const newGame = newGameObject();
    const uid = 'uid';
    const data = { gameId };
    const context = {
      auth: { uid },
    };
    newGame.players = [uid];
    newGame.currentPlayer = 0;
    await createGame(gameId, newGame);

    const res = await wrapped(data, context);

    expect(res).to.be.deep.equal({ result: 'user already added' });

    const snap = await admin
      .firestore()
      .collection('games')
      .doc(gameId)
      .get();

    const game = snap.data()!;

    expect(game).to.exist;
    expect(logStubs.info).to.be.calledWith('Adding user to game - repeated user');
    expect(logStubs.info).to.not.be.calledWith('Adding user to game - success');
    expect(game.players).to.be.an('array').that.deep.equals([uid]);
    expect(game.currentPlayer).to.be.equal(0);
  });

  it('should add user to game if game has other users', async function () {
    const newGame = newGameObject();
    const uid = 'uid';
    const data = { gameId };
    const context = {
      auth: { uid },
    };
    newGame.players = ['uid1', 'uid2'];
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
    expect(logStubs.info).to.not.be.calledWith('Adding user to game - repeated user');
    expect(logStubs.info).to.be.calledWith('Adding user to game - success');
    expect(game.players).to.be.an('array').that.deep.equals(['uid1', uid, 'uid2']);
    expect(game.currentPlayer).to.be.equal(2);
  });

  it('should add user to end of player list if current player is at position 0', async function () {
    const newGame = newGameObject();
    const uid = 'uid';
    const data = { gameId };
    const context = {
      auth: { uid },
    };
    newGame.players = ['uid1', 'uid2'];
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

    expect(game).to.exist;
    expect(logStubs.info).to.not.be.calledWith('Adding user to game - repeated user');
    expect(logStubs.info).to.be.calledWith('Adding user to game - success');
    expect(game.players).to.be.an('array').that.deep.equals([uid, 'uid1', 'uid2']);
    expect(game.currentPlayer).to.be.equal(1);
  });
});
