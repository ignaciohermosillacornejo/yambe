const testEnv = require('firebase-functions-test')({
  databaseURL: 'yambe-dev.firebaseapp.com',
  projectId: 'yambe-dev',
}, './service-account.json');

export { testEnv };
