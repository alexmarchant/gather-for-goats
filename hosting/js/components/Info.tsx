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
          <a href={sponsor.url} className="info__block-link" target="_blank">{sponsor.name}</a>
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
            A collaborative project for <a href="http://www.liftinghandsinternational.org/" target="_blank">Lifting Hands International</a>, a registered non-profit we carefully selected for their passionate dedication and impeccable efficiency!
          </strong></p>
        </div>
        <hr className="info__section-rule" />
        <div className="info__section">
          <a
            href="https://donorbox.org/goats-for-syrian-bedouin-refugees-in-jordan-1"
            className="info__block-link info__star-button buy-button"
            target="_blank"
          >
            <img src={buyAGoatStar} />
          </a>
          <a
            href="#about__history"
            className="info__block-link"
            onClick={this.handleLearnMoreClick}
          >
            Learn More
          </a>
          <a
            href="http://www.liftinghandsinternational.org/contact/"
            className="info__block-link"
            target="_blank"
          >
            Contact
          </a>
        </div>
        <hr className="info__section-rule" />
        <div className="info__section">
          <a
            href="https://twitter.com/LiftingHandsINT"
            className="info__block-link"
            target="_blank"
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com/liftinghandsinternational/"
            className="info__block-link"
            target="_blank"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/events/209924056167843/"
            className="info__block-link"
            target="_blank"
          >
            Facebook
          </a>
          <a
            href="https://www.youtube.com/watch?v=YV0zBl6RUjc"
            className="info__block-link"
            target="_blank"
          >
            YouTube
          </a>
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
          <div className="info__download-buttons">
            <a
              href="https://firebasestorage.googleapis.com/v0/b/great-goat-gala.appspot.com/o/CERTIFICATE.pdf?alt=media&token=b3051444-8c96-4153-8a11-402fcdd97c73"
              className="arrow-link download-button"
              download
            >
              8.5x11 Certificate
            </a>
            <a
              href="https://firebasestorage.googleapis.com/v0/b/great-goat-gala.appspot.com/o/MOTHERSDAY.pdf?alt=media&token=819bcfb0-3164-46af-8e8c-01e12262f3b0"
              className="arrow-link download-button"
              download
            >
              5x4 Mother's Day Card
            </a>
            <a
              href="https://firebasestorage.googleapis.com/v0/b/great-goat-gala.appspot.com/o/KID.pdf?alt=media&token=cdaf0dc4-4dbd-4165-ad3a-accea8ca629a"
              className="arrow-link download-button"
              download
            >
              4x5 Kid Card
            </a>
          </div>
        </div>
        <hr className="info__section-rule" />
        <div className="info__section">
          <img src={goatx10} />
          <h4>Did you Know?</h4>
          <p>
            A group of goats is called a trap! Would your business or group like to sponsor a trap of at least 10 goats and be listed in our official sponsor section?
          </p>
          <a
            href="https://donorbox.org/goats-for-syrian-bedouin-refugees-in-jordan-1"
            className="arrow-link buy-button"
            target="_blank"
          >
            Sponsor a Trap
          </a>
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
            Special thanks to <a href="http://www.alexmarchant.com" target="_blank">Alex Marchant</a> for bringing this project to life with his programming skills.
          </p>
        </div>
      </div>
    );
  }
}
