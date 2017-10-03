require('../../css/Home.scss');

import * as React from 'react';
import firebase from '../scripts/firebase';
import Info from './Info';
import About from './About';
import GoatGrid from './GoatGrid';
import { Sponsor } from './Admin';

interface HomeState {
  goatsPurchased?: number;
  additionalGoatsPurchased?: number;
  sponsors?: Array<Sponsor>;
}

export default class Home extends React.Component<any, HomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      goatsPurchased: null,
      additionalGoatsPurchased: null,
    };
  }

  componentDidMount() {
    firebase.database().ref('/').on('value', (snapshot) => {
      const result = snapshot.val();
      const additionalGoatsPurchased = result.additionalGoatsPurchased;
      const goatsPurchased = result.goatsPurchased;
      const sponsors = JSON.parse(result.sponsors);
      this.setState({
        goatsPurchased: goatsPurchased,
        additionalGoatsPurchased: additionalGoatsPurchased,
        sponsors: sponsors,
      });
    });
  }

  render() {
    return (
      <div className="home">
        <div className="home__mobile">
          <Header />
          <Nav sponsors={this.state.sponsors} />
          <GoatGrid
            goatsPurchased={this.state.goatsPurchased}
            additionalGoatsPurchased={this.state.additionalGoatsPurchased}
          />
        </div>
        <div className="home__desktop">
          <div className="home__desktop-col-left">
            <Header />
            <div className="home__desktop-below-header">
              <div className="home__desktop-below-header-col-left">
                <Info sponsors={this.state.sponsors} />
              </div>
              <div className="home__desktop-below-header-col-right">
                <About />
              </div>
            </div>
          </div>
          <div className="home__desktop-col-right">
            <GoatGrid
              goatsPurchased={this.state.goatsPurchased}
              additionalGoatsPurchased={this.state.additionalGoatsPurchased}
            />
          </div>
        </div>
      </div>
    );
  }
}

const Header = () => (
  <div className="home__header">
    <h1>Gather for Goats</h1>
    <hr />
    <h2>A Worldwide Benefit for Syrian Refugees</h2>
  </div>
);

export enum NavSection {
  None,
  Info,
  About
}

interface NavProps {
  sponsors?: Array<Sponsor>;
}

interface NavState {
  activeSection: NavSection;
}

class Nav extends React.Component<NavProps, NavState> {
  constructor(props: any) {
    super(props);

    this.state = {
      activeSection: NavSection.None,
    };

    this.handleInfoClick = this.handleInfoClick.bind(this);
    this.handleAboutClick = this.handleAboutClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.openNavSection = this.openNavSection.bind(this);
  }

  handleInfoClick() {
    this.setState({activeSection: NavSection.Info});
  }

  handleAboutClick() {
    this.setState({activeSection: NavSection.About});
  }

  handleClose() {
    this.setState({activeSection: NavSection.None});
  }

  openNavSection(navSection: NavSection) {
    this.setState({activeSection: navSection});
  }

  infoContent() {
    if (this.state.activeSection === NavSection.Info) {
      return (
        <Info
          handleClose={this.handleClose}
          openNavSection={this.openNavSection}
          sponsors={this.props.sponsors}
        />
      );
    } else {
      return (
        <button
          className="home__nav-button"
          onClick={this.handleInfoClick}
        >
          Navigation + Info
        </button>
      );
    }
  }

  aboutContent() {
    if (this.state.activeSection === NavSection.About) {
      return <About handleClose={this.handleClose} />
    } else {
      return (
        <button
          className="home__nav-button"
          onClick={this.handleAboutClick}
        >
          About the Project
        </button>
      );
    }
  }

  render() {
    return (
      <nav className="home__nav">
        <div className="home__nav-info">
          {this.infoContent()}
        </div>
        <div className="home__nav-about">
          {this.aboutContent()}
        </div>
        <div className="home__nav-buy">
          <a
            className="home__nav-button buy-button"
            href="https://donorbox.org/goats-for-syrian-bedouin-refugees-in-jordan-1"
            target="_blank"
          >
            Buy a Goat
          </a>
        </div>
      </nav>
    );
  }
}

