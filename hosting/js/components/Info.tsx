require('../../css/Info.scss');

import * as React from 'react';
import * as _ from 'lodash';
import { NavSection } from './Home';
import { scrollToAboutHistory } from '../scripts/scrollTo';
import { Sponsor } from './Admin';

const buyAGoatStar = require('../../images/buy-a-goat-star.svg');
const gift = require('../../images/gift.svg');
const goatx10 = require('../../images/goatx10.svg');

export interface InfoProps {
  handleClose?: () => void;
  openNavSection?: (navSection: NavSection) => void;
  sponsors?: Array<Sponsor>;
}

export default class Info extends React.Component<InfoProps, any> {
  constructor(props: InfoProps) {
    super(props);

    this.handleLearnMoreClick = this.handleLearnMoreClick.bind(this);
  }

  handleLearnMoreClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    if (this.props.openNavSection) {
      this.props.openNavSection(NavSection.About);
    }

    setTimeout(scrollToAboutHistory, 250);
  }

  render() {
    let sponsors;

    if (this.props.sponsors) {
      sponsors = _.map(this.props.sponsors, (sponsor, index) => (
        <li key={index}>
          <a href={sponsor.url} className="info__block-link">{sponsor.name}</a>
        </li>
      ));
    } else {
      sponsors = <li>Loading...</li>;
    }

    return (
      <div className="info">
        {
          this.props.handleClose ?
          <button
            className="home__nav-section-close"
            onClick={this.props.handleClose}
          /> :
          null
        }
        <div className="info__section">
          <p><strong>
              A collaborative project for <a href="http://www.liftinghandsinternational.org/">Lifting Hands International</a>, a registered 501(c)(3) we carefully selected for their passionate dedication and impeccable efficiency!
          </strong></p>
        </div>
        <hr className="info__section-rule" />
        <div className="info__section">
          <a href="https://donorbox.org/goats-for-syrian-bedouin-refugees-in-jordan-1" className="info__block-link info__star-button">
            <img src={buyAGoatStar} />
          </a>
          <a
            href="#about__history"
            className="info__block-link"
            onClick={this.handleLearnMoreClick}
          >
            Learn More
          </a>
          <a href="http://www.liftinghandsinternational.org/contact/" className="info__block-link">Contact</a>
        </div>
        <hr className="info__section-rule" />
        <div className="info__section">
          <a href="https://twitter.com/LiftingHandsINT" className="info__block-link">Twitter</a>
          <a href="https://www.instagram.com/liftinghandsinternational/" className="info__block-link">Instagram</a>
          <a href="" className="info__block-link">Facebook</a>
          <a href="https://www.youtube.com/watch?v=YV0zBl6RUjc" className="info__block-link">YouTube</a>
        </div>
        <hr className="info__section-rule" />
        <div className="info__section">
          <img src={gift} />
          <h4>Gift a Goat!</h4>
          <p>
            Psst! Mother’s Day is May 14!
            <br/>
            Download an official Goat Sponsor Certificate— the perfect gift!
          </p>
          <a href="" className="arrow-link">Download</a>
        </div>
        <hr className="info__section-rule" />
        <div className="info__section">
          <img src={goatx10} />
          <h4>Did you Know?</h4>
          <p>
            A group of goats is called a trap! Would your business or group like to sponsor a trap of at least 10 goats and be listed in our official sponsor section?
          </p>
          <a href="https://donorbox.org/goats-for-syrian-bedouin-refugees-in-jordan" className="arrow-link">Sponsor a Trap</a>
        </div>
        <hr className="info__section-rule" />
        <div className="info__section">
          <p>
            Thank you so much to all our generous sponsors and co-hosts:
          </p>
          <ul>
            {sponsors}
          </ul>
        </div>
        <hr className="info__section-rule" />
        <div className="info__section">
          <p>
            Special thanks to <a href="http://www.alexmarchant.com">Alex Marchant</a> for bringing this project to life with his programming skills.
          </p>
        </div>
      </div>
    );
  }
}
