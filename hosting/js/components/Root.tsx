require('../../node_modules/normalize.css/normalize.css');
require('../../css/global.scss');
require('../../css/type.scss');

import * as React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';

export default class Root extends React.Component<any, any> {
  render() {
    return (
      <Router>
        <div className="router">
          <Route exact path="/" component={Home}/>
          <Route path="/admin" component={Admin}/>
        </div>
      </Router>
    );
  }
}

