require('../../css/About.scss');

import * as React from 'react';
import { scrollToAboutHistory } from '../scripts/scrollTo';

export interface AboutProps {
  handleClose?: () => void;
}

export default class About extends React.Component<AboutProps, any> {
  constructor(props: AboutProps) {
    super(props);

    this.handleMoreDetailsClick = this.handleMoreDetailsClick.bind(this);
  }

  handleMoreDetailsClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    scrollToAboutHistory();
  }

  render() {
    return (
      <div className="about">
        {
          this.props.handleClose ?
          <button
            className="home__nav-section-close"
            onClick={this.props.handleClose}
          /> :
          null
        }
        <h4>The Goal</h4>
        <p>
          Buy 800 goats for Syrian refugee families living in the Jordan desert to provide a sustainable source of nutrition and hydration for children in this uninhabited area.
          &nbsp;
          <a
            href="#about__history"
            className="arrow-link"
            onClick={this.handleMoreDetailsClick}
          >
            More details
          </a>
        </p>

        <h4>The Plan</h4>
        <p>
          Host a dinner party (or brunch, BBQ, etc); ask guests to donate what they would have spent going out to the goat fund. 
        </p>

        <h4>Can't Host?</h4>
        <p>
					That's ok! You can still help pitch in money towards a goat, or help by spreading the word.
        </p>

        <h4>Who?</h4>
        <p>
          Anyone who wants to help refugees—this project is for you. Adapt it to your budget, schedule, style. 
        </p>

        <h4>When?</h4>
        <p>
          The key weekend is May 5-7, when thousands of people around the world will join forces. (But if you need to shift your dates, there’s no wrong time to fund a goat!)
        </p>

        <h4>How?</h4>
        <p>
          Customize your piece of the project however you like. Here’s some ideas:
        </p>
        <ul>
          <li>Fancy ladies-only sit down dinner with girlfriends.</li>
          <li>Casual pizza night with a few families.</li>
          <li>Potluck picnic or BBQ</li>
        </ul>
        <p>
          Or whatever sounds fun and manageable—more than the menu itself, the point is to gather with great people in person, and in spirit with thousands of others around the world all committed to a great cause.
        </p>

        <h4>Can Kids Help?</h4>
        <p>
          If you have been looking for service projects to do with your kids, this is a great opportunity! Even if you opt to do a grown-ups only dinner, kids can help plan the menu, make place cards, set the table, etc and feel proud that they are helping raise money for something you can easily explain to them. 
        </p>
        <p>
          ("We are raising money to buy a goat for a family who needs milk," is easier to talk about with little ones than trying to explain war and the refugee crisis.)
        </p>

        <h4>Collection</h4>
        <p>
          Pass <a href="https://donorbox.org/goats-for-syrian-bedouin-refugees-in-jordan-1">this page</a> around on a phone or tablet after the meal (just like you would a check!) to capitalize on the momentum and save guests from having to remember and dig up the page later.
        </p>

        <h4>#GATHERFORGOATS</h4>
        <p>
          Share  plans, photos, and your portion of the story with friends and collaborators around the world using the hashtag #GATHERFORGOATS.
        </p>

        <h4 id="about__history">History</h4>
        <p>
          The families we are hoping to help with this project are from the Idlib region of Syria, which is the region most recently <a href="https://www.nytimes.com/2017/04/04/world/middleeast/syria-gas-attack.html?smid=fb-nytimes&smtyp=cur&_r=0">attacked with chemical weapons</a>. They have been subjected to countless atrocities for the last six years, and a large group of families from that region have congregated in an area called Almafraq-Jordan, which hosts more than 100,000 Syrian refugees, most of them are living in random, unofficial campsites on farmers' private land. (It is very expensive for a refugee to be smuggled into Greece or Europe, and people without the means to pay to get further have stopped just beyond the border.)
        </p>
        <p>
          There is no official government or humanitarian presence in these camps, which means the situation is even more dire than camps in other parts of the world. Children are suffering from malnutrition, dehydration, and illnesses left untreated because there is little to no access to medical care. There is no stable food supply, nor transportation to local markets in order to purchase food. Families are sleeping in tents made of cheap tarps buried in dirt in attempt to protection from rain, snakes, and scorpions—not only are these makeshift tents ineffective at keeping these out, they also excruciatingly hot. 
        </p>
        <p>
          Many of the Syrian refugees in Almafraq area are from a Bedouin background—their livelihood, which they lost when they ran for their lives, was caring for cattle, sheep and goats. 
          &nbsp;
          <a href="http://www.liftinghandsinternational.org/blog/2017/4/6/goats-for-syrian-bedouin-refugees-in-jordan" className="arrow-link">See Photos</a>
        </p>

        <h4>Why Goats?</h4>
        <p>
          400 of the most vulnerable families (those with small children and babies) in this region will be given two female goats. These goats will produce daily milk which will provide critical vitamins and nutrition for the children. Families can also produce milk products such as butter and cheese. Beyond caring for their own families, they will be able to sell some of the product for a small source of income. Goats are low-maintenance animals who are able to eat the wild vegetation in this area. The Bedouin culture is also familiar with using goat fur to create tents, which provides a waterproof, wind-resistant, portable structure for protection from the elements that allows much better ventilation. 
        </p>

        <h4>Testimonial</h4>
        <p>
          We carefully vetted and selected <a href="http://www.liftinghandsinternational.org/">Lifting Hands InternationaI</a> out of many worthy NGOs working on behalf of refugees. After working closely with this group for the last 18 months, we have been incredibly moved by the passion, dedication, and efficiency of the team. With almost no overhead, nearly every cent donated goes directly to life saving projects. Further, where bigger organizations are being hindered by difficult bureaucracy and politics, small NGOs are better able to nimbly work around these obstacles and accomplish projects.
        </p>
      </div>
    );
  }
}

