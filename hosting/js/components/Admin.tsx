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

interface LoggedInContentState {
  goatsPurchased?: number;
  submitting: boolean;
  submitted: boolean;
}

class LoggedInContent extends React.Component<any, LoggedInContentState> {
	constructor(props: any) {
		super(props);

    this.state = {
      goatsPurchased: null,
      submitting: false,
      submitted: false,
    };

		this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

  componentDidMount() {
    firebase.database().ref('/').on('value', (snapshot) => {
      const result = snapshot.val();
      const goatsPurchased = result.goatsPurchased;
      this.setState({
        goatsPurchased: goatsPurchased,
      });
    });
  }

  handleLogOutClick() {
		firebase.auth().signOut().then(() => {}, (error) => {
      console.error(error);
      alert('Error :(');
    });
  }

  handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    const key = event.currentTarget.name;
    const value = parseInt(event.currentTarget.value);
    this.setState({
      submitted: false,
      [key as any]: value,
    });
  }

  handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    this.setState({submitting: true});

    const updates = {
      goatsPurchased: this.state.goatsPurchased,
    };

    firebase.database().ref().update(updates).then(() => {
      console.log('Updated...');
      this.setState({
        submitting: false,
        submitted: true,
      });
    }, (err) => {
      console.error(`Error... ${err}`);
      alert('Sorry, something went wrong :( Email me (alex)')
      this.setState({submitting: false});
    });
  }

  render() {
    let submitValue = "Save";
    if (this.state.submitting) {
      submitValue = "Saving..."
    } else if (this.state.submitted) {
      submitValue = "Saved!"
    }

    return (
      <div>
        <button onClick={this.handleLogOutClick}>Log Out</button>
        {
          (this.state.goatsPurchased === null) ?
          <div>Loading...</div> :
          <form onSubmit={this.handleFormSubmit}>
            <h2>Update Data:</h2>
            <h3>Goats Purchased</h3>
            <input
              type="number"
              name="goatsPurchased"
              value={this.state.goatsPurchased}
              onChange={this.handleInputChange}
            />
            <input
              type="submit"
              value={submitValue}
            />
          </form>
        }
      </div>
    );
  }
};
