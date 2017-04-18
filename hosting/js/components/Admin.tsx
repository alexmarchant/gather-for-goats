require('../../css/Admin.scss');
require('../../node_modules/firebaseui/dist/firebaseui.css');

import * as React from 'react';
import firebase from '../scripts/firebase';
import Auth from './Auth';

enum LoggedInState {
  Loading,
  LoggedIn,
  NotLoggedIn,
}

interface AdminState {
  loggedInState: LoggedInState;
  currentUser?: firebase.User;
}

export default class Admin extends React.Component<any, AdminState> {
  constructor(props: any) {
    super(props);

    this.state = {
      loggedInState: LoggedInState.Loading,
      currentUser: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user?: firebase.User) => {
      if (user) {
        this.setState({
          loggedInState: LoggedInState.LoggedIn,
          currentUser: user,
        })
      } else {
        this.setState({loggedInState: LoggedInState.NotLoggedIn})
      }
    });
  }

  bodyContent() {
    switch(this.state.loggedInState) {
      case LoggedInState.Loading:
        return <div>Loading...</div>;
      case LoggedInState.LoggedIn:
        return <div>Do Stuff</div>;
      case LoggedInState.NotLoggedIn:
        return <Auth />;
      default:
        return <div>Error :(</div>;
    }
  }

  render() {
    return (
      <div className="admin">
        <h1>Admin</h1>
        <div className="admin__body">
          {this.bodyContent()}
        </div>
      </div>
    );
  }
}

