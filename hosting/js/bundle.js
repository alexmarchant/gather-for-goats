require('./scripts/analytics.js');

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import './scripts/scrollTo';

// Init react app
const el = React.createElement(Root);
ReactDOM.render(el, document.getElementById('app-root'));

