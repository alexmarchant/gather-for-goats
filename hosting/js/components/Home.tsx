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
  }

  handleInfoClick() {
    this.setState({activeSection: NavSection.Info});
  }

  handleAboutClick() {
    this.setState({activeSection: NavSection.About});
  }

  render() {
    return (
      <div className="home__nav">
        <ul>
          <li
            className="home__nav-info"
            onClick={this.handleInfoClick}
          >
            Navigation + Info
          </li>
          <li
            className="home__nav-about"
            onClick={this.handleAboutClick}
          >
            About the Project
          </li>
          <li className="home__nav-buy">
            <a href="">Buy a Goat</a>
          </li>
        </ul>
      </div>
    );
  }
}

