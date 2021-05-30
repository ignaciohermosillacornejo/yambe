import * as admin from 'firebase-admin';
import { expect } from './chai.commons';
import { startLoggingStubs, stopLoggingStubs, resetLoggingStubs } from './utils/logging-stubs';

const testEnv = require('firebase-functions-test')({
  databaseURL: 'yambe-dev.firebaseapp.com',
  projectId: 'yambe-dev',
}, './service-account.json');
// we must import functions after testEnv initialization
// eslint-disable-next-line import/order, import/first
import { addUserToGame } from '../src/index';

describe('addUserToGame', function () {
  let wrapped: any;
  const logStubs = {};

  before(function () {
    startLoggingStubs(logStubs);
    wrapped = testEnv.wrap(addUserToGame);
  });

  after(function () {
    testEnv.cleanup();
    stopLoggingStubs(logStubs);
  });

  afterEach(function () {
    resetLoggingStubs(logStubs);
  });

  it('should add user to game', async function () {
    const gameId = '29fyY4af1DqbllTdd6Jy';
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

    expect(snap.data()).to.exist;
    expect(snap.data()?.players).to.be.an('array').that.includes(uid);
  });
});
