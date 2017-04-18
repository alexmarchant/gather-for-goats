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
        this.setState({
          loggedInState: LoggedInState.NotLoggedIn,
          currentUser: null,
        })
      }
    });
  }

  bodyContent() {
    switch(this.state.loggedInState) {
      case LoggedInState.Loading:
        return <div>Loading...</div>;
      case LoggedInState.LoggedIn:
        return <LoggedInContent />;
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

interface Sponsor {
  name: string;
  url: string;
}

interface LoggedInContentState {
  goatsPurchased?: number;
  sponsors?: Array<Sponsor>;
}

class LoggedInContent extends React.Component<any, LoggedInContentState> {
	constructor(props: any) {
		super(props);

    this.state = {
      goatsPurchased: null,
      sponsors: null,
    };

		this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

  componentDidMount() {
    firebase.database().ref('/').on('value', (snapshot) => {
      const result = snapshot.val();
      const goatsPurchased = result.goatsPurchased;
      const sponsors = JSON.parse(result.sponsors);
      this.setState({
        goatsPurchased: goatsPurchased,
        sponsors: sponsors,
      });
    });
  }

  handleLogOutClick() {
		firebase.auth().signOut().then(() => {}, (error) => {
      console.error(error);
      alert('Error :(');
    });
  }

  handleFormSubmit() {
  }

  render() {
    return (
      <div>
        <button onClick={this.handleLogOutClick}>Log Out</button>
        {
          (this.state.goatsPurchased === null || this.state.sponsors === null) ?
          <div>Loading...</div> :
          <form onSubmit={this.handleFormSubmit}>
            <h2>Update Data:</h2>
            <h3>Goats Purchased</h3>
            <input type="number" value={this.state.goatsPurchased} />
            <h3>Sponsors</h3>
            <input type="text" value={this.state.goatsPurchased} />
            <input type="submit" value="Submit" />
          </form>
        }
      </div>
    );
  }
};
