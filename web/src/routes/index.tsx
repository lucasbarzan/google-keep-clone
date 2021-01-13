import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Home from '../pages/Home';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route isPrivate path="/" exact component={Home} />
    <Route isPrivate path="/archive" component={Home} />
    <Route isPrivate path="/tags/:id" component={Home} />
  </Switch>
);

export default Routes;
