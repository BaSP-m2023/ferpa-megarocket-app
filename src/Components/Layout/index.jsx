import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';

import Activities from '../Activities';
import Admins from '../Admins';
import Classes from '../Classes';
import Members from '../Members';
import Subscriptions from '../Subscriptions';
import SubscriptionForm from '../Subscriptions/Form';
import SuperAdmins from '../SuperAdmins';
import Trainers from '../Trainers';
import Home from '../Home';

function Layout() {
  return (
    <Switch>
      <Route exact path="/activities" component={Activities} />
      <Route path="/activities/:id" component={Activities} />
      <Route exact path="/admins" component={Admins} />
      <Route path="/admins/:id" component={Admins} />
      <Route exact path="/classes" component={Classes} />
      <Route path="/classes/:id" component={Classes} />
      <Route exact path="/members" component={Members} />
      <Route path="/members/:id" component={Members} />
      <Route exact path="/subscriptions" component={Subscriptions} />
      <Route exact path="/subscriptions/form" component={SubscriptionForm} />
      <Route path="/subscriptions/form/:id" component={SubscriptionForm} />
      <Route exact path="/super-admins" component={SuperAdmins} />
      <Route path="/super-admins/:id" component={SuperAdmins} />
      <Route exact path="/trainers" component={Trainers} />
      <Route path="/trainers/:id" component={Trainers} />
      <Route path="/home" component={Home} />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
}

export default Layout;
