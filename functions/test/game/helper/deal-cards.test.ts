import * as admin from 'firebase-admin';
import { expect } from '../../chai.commons';
import { startLoggingStubs, stopLoggingStubs, resetLoggingStubs } from '../../utils/logging-stubs';

import { createGame } from '../../utils/create-game';
import { removeGame } from '../../utils/remove-game';
import { newGameObject } from '../../../src/game/helper/new-empty-game';
import { fillPlayerHand } from '../../utils/fill-player-hand';
import { fillGameDeck } from '../../utils/fill-game-deck';
import { dealAnswerCards } from '../../../src/game/helper/deal-card';

describe('dealAnswerCards', function () {
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
    await removeGame(gameId);
    resetLoggingStubs(logStubs);
  });

  it('should deal apropiate number of answer cards', async function () {
    await fillGameDeck(gameRef, 5, 5);
    await dealAnswerCards({
      gameRef, userId, numberOfCards: 3,
    });
    const playerCardsRef = await gameRef.collection('playerHands').doc(userId).get();
    const { cards } = playerCardsRef.data()!;
    expect(cards).to.be.length(3);
    cards.forEach(e => {
      expect(e).to.include.keys(['type', 'content', 'id']);
      expect(e.type).to.be.equal('answer');
    });
  });

  it('should deal a maximum of 8 cards to a player despite incorrect param', async function () {
    await fillGameDeck(gameRef, 10, 0);
    await dealAnswerCards({
      gameRef, userId, numberOfCards: 10,
    });
    const playerCardsRef = await gameRef.collection('playerHands').doc(userId).get();
    const { cards } = playerCardsRef.data()!;
    expect(cards).to.be.length(8);
    cards.forEach(e => {
      expect(e).to.include.keys(['type', 'content', 'id']);
      expect(e.type).to.be.equal('answer');
    });
  });

  it('should deal 3 cards to a player that has 5 cards already when asked to deal 10 cards', async function () {
    const fillGameDeckPromise = fillGameDeck(gameRef, 10, 0);
    const fillPlayerHandPromise = fillPlayerHand(gameRef, userId, 5, 0);
    await Promise.all([fillPlayerHandPromise, fillGameDeckPromise]);
    await dealAnswerCards({
      gameRef, userId, numberOfCards: 10,
    });
    const playerCardsRef = await gameRef.collection('playerHands').doc(userId).get();
    const { cards } = playerCardsRef.data()!;
    expect(cards).to.be.length(8);
    cards.forEach(e => {
      expect(e).to.include.keys(['type', 'content', 'id']);
      expect(e.type).to.be.equal('answer');
    });
  });
});
