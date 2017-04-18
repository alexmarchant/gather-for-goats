import * as React from 'react';
import * as Firebase from 'firebase';
import firebase from '../scripts/firebase';
import firebaseUI from '../scripts/firebaseui';

export default class Auth extends React.Component<any, any> {
  componentDidMount() {
    // Initialize FirebaseUI
    const uiConfig = {
      callbacks: {
        signInSuccess: (currentUser: Firebase.User, credential?: Firebase.auth.AuthCredential, redirectUrl?: string) => {
          return true;
        },
      },
      signInFlow: 'redirect',
      signInOptions: [
        Firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
      tosUrl: '/#/tos'
    };
    // The start method will wait until the DOM is loaded.
    firebaseUI.start('.auth__login-form', uiConfig);
  }

  render() {
    return (
      <div className="auth">
        <div className="auth__login-form" />
      </div>
    );
  }
}

