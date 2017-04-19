var functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.scrapeDonations = functions.https.onRequest((request, response) => {
  console.log('This is a test');
});

