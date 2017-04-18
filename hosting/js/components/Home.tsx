require('../../css/Home.scss');

import * as React from 'react';
import Info from './Info';
import About from './About';
import GoatGrid from './GoatGrid';

export default class Home extends React.Component<any, any> {
  render() {
    return (
      <div className="home">
        <Header />
        <Nav />
        <GoatGrid purchasedGoats={10} />
      </div>
    );
  }
}

const Header = () => (
  <div className="home__header">
    <h1>The Great Goat Gala</h1>
    <hr />
    <h2>A Worldwide Fundraiser Event For Syrian Refugees</h2>
  </div>
);

enum NavSection {
  None,
  Info,
  About
}

interface NavState {
  activeSection: NavSection;
}

class Nav extends React.Component<any, NavState> {
  constructor(props: any) {
    super(props);

    this.state = {
      activeSection: NavSection.None,
    };

    this.handleInfoClick = this.handleInfoClick.bind(this);
    this.handleAboutClick = this.handleAboutClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  infoContent() {
    if (this.state.activeSection === NavSection.Info) {
      return <Info handleClose={this.handleClose} />
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
            className="home__nav-button"
            href=""
          >
            Buy a Goat
          </a>
        </div>
      </nav>
    );
  }
}

