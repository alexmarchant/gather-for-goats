require('../../css/Info.scss');

import * as React from 'react';

const buyAGoatStar = require('../../images/buy-a-goat-star.svg');
const gift = require('../../images/gift.svg');
const goatx10 = require('../../images/goatx10.svg');

export interface InfoProps {
  handleClose?: () => void;
}

export default class Info extends React.Component<InfoProps, any> {
  render() {
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
            A collaborative project for Lifting Hands International, a registered 501(c)(3) we carefully selected for their passionate dedication and impeccable efficiency!
          </strong></p>
        </div>
        <hr className="info__section-rule" />
        <div className="info__section">
          <a href="" className="info__block-link info__star-button">
            <img src={buyAGoatStar} />
          </a>
          <a href="" className="info__block-link">Learn More</a>
          <a href="" className="info__block-link">Contact</a>
        </div>
        <hr className="info__section-rule" />
        <div className="info__section">
          <a href="" className="info__block-link">Twitter</a>
          <a href="" className="info__block-link">Instagram</a>
          <a href="" className="info__block-link">Facebook</a>
          <a href="" className="info__block-link">YouTube</a>
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
          <a href="" className="arrow-link">Sponsor a Trap</a>
        </div>
        <hr className="info__section-rule" />
        <div className="info__section">
          <p>
            Thank you so much to all our generous sponsors and co-hosts:
          </p>
          <ul>
            <li>
              <a href="" className="info__block-link">Cup of Jo</a>
            </li>
            <li>
              <a href="" className="info__block-link">Oh Happy Day</a>
            </li>
            <li>
              <a href="" className="info__block-link">Kelsey Nixon</a>
            </li>
          </ul>
        </div>
        <hr className="info__section-rule" />
        <div className="info__section">
          <p>
            Special thanks to <a href="https://www.alexmarchant.com">Alex Marchant</a> for bringing this project to life with his programming skills.
          </p>
        </div>
      </div>
    );
  }
}
