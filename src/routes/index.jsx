import { Switch, Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Loader from 'Components/Shared/Loader';

import Home from 'Components/Home';

const Activities = lazy(() => import('./activities'));
const ActivitiesForm = lazy(() => import('./activities/form'));
const Admins = lazy(() => import('./admins'));
const AdminsForm = lazy(() => import('./admins/form'));
const Classes = lazy(() => import('./classes'));
const Form = lazy(() => import('./classes/form'));
const Members = lazy(() => import('./members'));
const MembersCreate = lazy(() => import('./members/createForm'));
const MembersEdit = lazy(() => import('./members/editForm'));
const Subscriptions = lazy(() => import('./subscriptions'));
const SubscriptionForm = lazy(() => import('./subscriptions/form'));
const SuperAdmins = lazy(() => import('./superAdmins'));
const SuperAdminsForm = lazy(() => import('./superAdmins/form'));
const Trainers = lazy(() => import('./trainers'));
const FormTrainers = lazy(() => import('./trainers/form'));

function Layout() {
  return (
    <Suspense fallback={<Loader />}>
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
        <Route exact path="/members/create" component={MembersCreate} />
        <Route path="/members/edit/:id" component={MembersEdit} />
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
    </Suspense>
  );
}

export default Layout;
