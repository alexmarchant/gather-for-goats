require('../../css/GoatGrid.scss');

import * as React from 'react';
import * as _ from 'lodash';

const goatGraphic = require('../../images/goat.svg');

export interface GoatGridProps {
  purchasedGoats: number;
}

export default class GoatGrid extends React.Component<GoatGridProps, any> {
  goatCount: number;
  
  constructor(props: GoatGridProps) {
    super(props);
    this.goatCount = 800;
  }

  render() {
    return (
      <div className="goat-grid">
        <h3>{this.props.purchasedGoats}/800</h3>
        <h3>Goats Purchased</h3>
        <div className="goat-grid__grid">
          {_.map(_.range(this.goatCount), (index) => (
            <Goat
              purchased={index < this.props.purchasedGoats}
              index={index}
              key={index}
            />
          ))}
        </div>
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

