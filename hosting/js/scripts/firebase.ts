import * as Firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC-DdPBuCymDf6499EVadwIniegN-wVMlM",
  authDomain: "great-goat-gala.firebaseapp.com",
  databaseURL: "https://great-goat-gala.firebaseio.com",
  projectId: "great-goat-gala",
  storageBucket: "great-goat-gala.appspot.com",
  messagingSenderId: "745068492632"
};

const firebase = Firebase.initializeApp(config);

export default firebase;

