import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';

import Activities from '../Activities';
import ActivitiesForm from '../Activities/Form';
import Admins from '../Admins';
import Classes from '../Classes';
import Members from '../Members';
import Subscriptions from '../Subscriptions';
import SubscriptionForm from '../Subscriptions/Form';
import SuperAdmins from '../SuperAdmins';
import SuperAdminsForm from '../SuperAdmins/Form';
import Trainers from '../Trainers';
import FormTrainers from '../Trainers/FormTrainers';
import AdminsForm from '../Admins/Form';

import Form from '../Classes/Form';

import Home from '../Home';

function Layout() {
  return (
    <Switch>
      <Route exact path="/activities" component={Activities} />
      <Route path="/activities/create" component={ActivitiesForm} />
      <Route path="/activities/edit/:id" component={ActivitiesForm} />
      <Route exact path="/admins" component={Admins} />
      <Route exact path="/admins/form" component={AdminsForm} />
      <Route path="/admins/form/:id" component={AdminsForm} />
      <Route exact path="/classes" component={Classes} />
      <Route path="/classes/form/:id" component={Form} />
      <Route exact path="/classes/form" component={Form} />
      <Route exact path="/members" component={Members} />
      <Route path="/members/:id" component={Members} />
      <Route exact path="/subscriptions" component={Subscriptions} />
      <Route exact path="/subscriptions/form" component={SubscriptionForm} />
      <Route path="/subscriptions/form/:id" component={SubscriptionForm} />
      <Route exact path="/super-admins" component={SuperAdmins} />
      <Route path="/super-admins/create" component={SuperAdminsForm} />
      <Route path="/super-admins/edit/:id" component={SuperAdminsForm} />
      <Route exact path="/trainers" component={Trainers} />
      <Route exact path="/trainers/Form" component={FormTrainers} />
      <Route path="/trainers/Form/:id" component={FormTrainers} />
      <Route path="/home" component={Home} />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
}

export default Layout;
