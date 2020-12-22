import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '../pages/Home';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={Home} />

    <Route path="/" exact component={Home} />
    <Route path="/archive" component={Home} />
    <Route path="/tags/:id" component={Home} />
  </Switch>
);

export default Routes;
