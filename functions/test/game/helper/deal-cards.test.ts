import * as admin from 'firebase-admin';
import { expect } from '../../chai.commons';
import { startLoggingStubs, stopLoggingStubs, resetLoggingStubs } from '../../utils/logging-stubs';

import { testEnv } from '../../utils/create-test-env';
// we must import functions after testEnv initialization
// eslint-disable-next-line import/order, import/first
import { addUserToGame } from '../../../src/index';
import { createGame } from '../../utils/create-game';
import { removeGame } from '../../utils/remove-game';
import { newGameObject } from '../../../src/game/helper/new-empty-game';
import { fillPlayerHand } from '../../utils/fill-player-hand';
import { fillGameDeck } from '../../utils/fill-game-deck';
import { dealCards } from '../../../src/game/helper/deal-card';

describe('dealCards', function () {
  const logStubs = {} as any;
  const gameId = 'testingGameId';
  const userId = 'userId';

  const gameRef = admin.firestore().collection('games').doc(gameId);

  before(async function () {
    await createGame(gameId, newGameObject());
    startLoggingStubs(logStubs);
    await removeGame(gameId);
  });

  after(async function () {
    stopLoggingStubs(logStubs);
  });

  beforeEach(async function () {
    await createGame(gameId, newGameObject());
  });

  afterEach(async function () {
    // await removeGame(gameId);
    resetLoggingStubs(logStubs);
  });

  it('should deal apropiate number of answer cards', async function () {
    await fillGameDeck(gameRef, 5, 5);
    await dealCards({
      gameRef, userId, numberOfCards: 3, type: 'answer',
    });
    const playerCardsRef = await gameRef.collection('playerHands').doc(userId).get();
    const { cards } = playerCardsRef.data()!;
    expect(cards).to.be.length(3);
    cards.forEach(e => {
      expect(e).to.include.keys(['type', 'content', 'id']);
      expect(e.type).to.be.equal('answer');
    });
  });

  // it('should deal a maximum of 8 cards to a player', async function () {
  //   await fillGameDeck(gameRef, 10, 0);
  //   await dealCards({
  //     gameRef, userId, numberOfCards: 10, type: 'answer',
  //   });
  //   const playerCardsRef = await gameRef.collection('playerHands').doc(userId).get();
  //   const { cards } = playerCardsRef.data()!;
  //   expect(cards).to.be.length(3);
  //   cards.forEach(e => {
  //     expect(e).to.include.keys(['type', 'content', 'id']);
  //     expect(e.type).to.be.equal('answer');
  //   });
  // });
});
