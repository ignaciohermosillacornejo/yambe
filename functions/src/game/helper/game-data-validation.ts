import * as functions from 'firebase-functions';

const validateGameData = (data: { gameId: any; }) => {
  if (!data || !data.gameId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The param game id is invalid',
    );
  }
};

export { validateGameData };
