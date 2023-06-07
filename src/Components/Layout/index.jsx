import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';

import Activities from '../Activities';
import Admins from '../Admins';
import Classes from '../Classes';
import Members from '../Members';
import Subscriptions from '../Subscriptions';
import SuperAdmins from '../SuperAdmins';
import Trainers from '../Trainers';
import addFormTrainers from '../Trainers/addFormTrainer';
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
      <Route path="/subscriptions/:id" component={Subscriptions} />
      <Route exact path="/super-admins" component={SuperAdmins} />
      <Route path="/super-admins/:id" component={SuperAdmins} />
      <Route exact path="/trainers" component={Trainers} />
      <Route exact path="/trainers/addFormTrainers" component={addFormTrainers} />
      <Route path="/trainers/addFormTrainers/:id" component={addFormTrainers} />
      <Route path="/home" component={Home} />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
}

export default Layout;
