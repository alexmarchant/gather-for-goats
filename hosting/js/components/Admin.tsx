require('../../css/Admin.scss');
require('../../node_modules/firebaseui/dist/firebaseui.css');

import * as React from 'react';
import * as _ from 'lodash';
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

export interface Sponsor {
  name: string;
  url: string;
}

interface LoggedInContentState {
  additionalGoatsPurchased?: number;
  sponsors?: Array<Sponsor>;
  submitting: boolean;
  submitted: boolean;
}

class LoggedInContent extends React.Component<any, LoggedInContentState> {
	constructor(props: any) {
		super(props);

    this.state = {
      additionalGoatsPurchased: null,
      sponsors: null,
      submitting: false,
      submitted: false,
    };

		this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddSponsorClick = this.handleAddSponsorClick.bind(this);
    this.handleSponsorNameChange = this.handleSponsorNameChange.bind(this);
    this.handleSponsorURLChange = this.handleSponsorURLChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

  componentDidMount() {
    firebase.database().ref('/').on('value', (snapshot) => {
      const result = snapshot.val();
      const additionalGoatsPurchased = result.additionalGoatsPurchased;
      const sponsors = JSON.parse(result.sponsors);
      this.setState({
        additionalGoatsPurchased: additionalGoatsPurchased,
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

  handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    const key = event.currentTarget.name;
    const value = parseInt(event.currentTarget.value);
    this.setState({
      submitted: false,
      [key as any]: value,
    });
  }

  handleAddSponsorClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const sponsors = this.state.sponsors;
    sponsors.push({name: "", url: ""});
    this.setState({
      submitted: false,
      sponsors: sponsors,
    });
  }

  removeSponsor(index: number) {
    const sponsors = this.state.sponsors;
    sponsors.splice(index, 1);
    this.setState({
      submitted: false,
      sponsors: sponsors,
    });
  }

  handleSponsorNameChange(event: React.FormEvent<HTMLInputElement>) {
    const index = parseInt(event.currentTarget.name);
    const name = event.currentTarget.value;
    const sponsors = this.state.sponsors;
    sponsors[index]['name'] = name;
    this.setState({
      submitted: false,
      sponsors: sponsors,
    });
  }

  handleSponsorURLChange(event: React.FormEvent<HTMLInputElement>) {
    const index = parseInt(event.currentTarget.name);
    const url = event.currentTarget.value;
    const sponsors = this.state.sponsors;
    sponsors[index]['url'] = url;
    this.setState({
      submitted: false,
      sponsors: sponsors,
    });
  }

  handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    this.setState({submitting: true});

    const updates = {
      additionalGoatsPurchased: this.state.additionalGoatsPurchased,
      sponsors: JSON.stringify(this.state.sponsors),
    };

    firebase.database().ref().update(updates).then(() => {
      console.log('Updated...');
      this.setState({
        submitting: false,
        submitted: true,
      });
    }, (err) => {
      console.error(`Error... ${err}`);
      alert('Sorry, something went wrong :( Email me')
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
          (this.state.additionalGoatsPurchased === null) ?
          <div>Loading...</div> :
          <form onSubmit={this.handleFormSubmit}>
            <h2>Update Data:</h2>
            <h3>Additional Goats Purchased (outside of donorbox.com)</h3>
            <input
              type="number"
              name="additionalGoatsPurchased"
              value={this.state.additionalGoatsPurchased}
              onChange={this.handleInputChange}
            />
            <h3>Sponsors</h3>

            {_.map(this.state.sponsors, (sponsor, index) => (
              <div className="admin__sponsor" key={index}>
                <div className="admin__sponsor-field-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={sponsor.name}
                    name={`${index}`}
                    onChange={this.handleSponsorNameChange}
                  />
                </div>
                <div className="admin__sponsor-field-group">
                  <label>URL:</label>
                  <input
                    type="url"
                    value={sponsor.url}
                    name={`${index}`}
                    onChange={this.handleSponsorURLChange}
                  />
                </div>
                <button onClick={() => { this.removeSponsor(index); }}>
                  Remove Sponsor
                </button>
              </div>
            ))}

            <p>
              <button onClick={this.handleAddSponsorClick}>
                Add Sponsor
              </button>
            </p>

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

