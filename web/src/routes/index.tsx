import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
// import Signup from '../pages/Signup';
// import ForgotPassword from '../pages/ForgotPassword';
// import ResetPassword from '../pages/ResetPassword';
import Home from '../pages/Home';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={Login} />
    {/* <Route path="/signup" component={Signup} /> */}
    {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
    {/* <Route path="/reset-password" component={ResetPassword} /> */}

    <Route path="/" exact component={Home} />
    <Route path="/archive" component={Home} />
    <Route path="/tags/:id" component={Home} />
  </Switch>
);

export default Routes;
