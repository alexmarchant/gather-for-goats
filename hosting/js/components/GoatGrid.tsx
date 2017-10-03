require('../../css/GoatGrid.scss');

import * as React from 'react';
import * as _ from 'lodash';

const goatGraphic = require('../../images/goat.svg');

export interface GoatGridProps {
  goatsPurchased?: number;
  additionalGoatsPurchased?: number;
}

export default class GoatGrid extends React.Component<GoatGridProps, any> {
  goatCount: number;
  
  constructor(props: GoatGridProps) {
    super(props);
    this.goatCount = 800;
  }

  content() {
    if (this.props.goatsPurchased === null || this.props.additionalGoatsPurchased === null) {
      return (
        <div className="goat-grid__header">
          <h3 className="goat-grid__header-subtitle">Loading...</h3>
        </div>
      );
    } else {
      const goatsPurchased = this.props.goatsPurchased + this.props.additionalGoatsPurchased;
      return (
        <div>
          <div className="goat-grid__header">
            <h3 className="goat-grid__header-purchased-count">
              {goatsPurchased}/800
            </h3>
            <h3 className="goat-grid__header-subtitle">Goats Purchased</h3>
          </div>
          <div className="goat-grid__grid">
            {_.map(_.range(this.goatCount), (index) => (
              <Goat
                purchased={index < goatsPurchased}
                index={index}
                key={index}
              />
            ))}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="goat-grid">
        {this.content()}
      </div>
    );
  }
}

interface GoatProps {
  purchased: boolean;
  index: number;
}

enum Color {
  yellow,
  pink,
  blue,
  brown,
  tan
}

class Goat extends React.Component<GoatProps, any> {
  color(): string {
    const colorIndex = this.props.index % 5;
    return Color[colorIndex];
  }

  className(): string {
    if (this.props.purchased) {
      return `goat__filled--${this.color()}`;
    } else {
      return 'goat';
    }
  }

  render() {
    return (
      <div className={this.className()}>
        <img src={goatGraphic} />
      </div>
    );
  }
};

