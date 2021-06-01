import * as functions from 'firebase-functions';

const isAuthed = (context: functions.https.CallableContext) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.',
    );
  }
};

export { isAuthed };
