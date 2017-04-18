import * as FirebaseUI from 'firebaseui';
import firebase from './firebase';

// Initialize the FirebaseUI Widget using Firebase.
const firebaseUI = new FirebaseUI.auth.AuthUI(firebase.auth());

export default firebaseUI;

