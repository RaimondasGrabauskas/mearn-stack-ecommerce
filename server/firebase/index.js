var admin = require('firebase-admin');

var serviceAccount = require('../config/fireBaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
