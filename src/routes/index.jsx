import { Switch, Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Loader from 'Components/Shared/Loader';

import Home from 'Components/Home';

const Activities = lazy(() => import('./activities'));
const ActivitiesForm = lazy(() => import('./activities/form'));
const Classes = lazy(() => import('./classes'));
const Form = lazy(() => import('./classes/form'));
const Members = lazy(() => import('./members'));
const MembersCreate = lazy(() => import('./members/createForm'));
const MembersEdit = lazy(() => import('./members/editForm'));
const Subscriptions = lazy(() => import('./subscriptions'));
const SubscriptionForm = lazy(() => import('./subscriptions/form'));
const Trainers = lazy(() => import('./trainers'));
const FormTrainers = lazy(() => import('./trainers/form'));
const MembersHome = lazy(() => import('./membersHome'));
const MembersProfile = lazy(() => import('./membersHome/profile'));
const MembersActivities = lazy(() => import('./membersHome/activities'));
const AdminsHome = lazy(() => import('./adminsHome'));
const AdminsProfile = lazy(() => import('./adminsHome/profile'));

function Layout() {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {/* //Admins Routes */}
        <Route exact path="/admins/home/activities" component={Activities} />
        <Route path="/admins/home/activities/create" component={ActivitiesForm} />
        <Route path="/activities/edit/:id" component={ActivitiesForm} />

        <Route exact path="/admins/home/classes" component={Classes} />
        <Route path="/admins/home/classes/form/:id" component={Form} />
        <Route exact path="/admins/home/classes/form" component={Form} />

        <Route exact path="/admins/home/members" component={Members} />
        <Route exact path="/admins/home/members/create" component={MembersCreate} />
        <Route path="/admins/home/members/edit/:id" component={MembersEdit} />

        <Route exact path="/admins/home/subscriptions" component={Subscriptions} />
        <Route exact path="/admins/home/subscriptions/form" component={SubscriptionForm} />
        <Route path="/admins/home/subscriptions/form/:id" component={SubscriptionForm} />

        <Route exact path="/admins/home/trainers" component={Trainers} />
        <Route exact path="/admins/home/trainers/Form" component={FormTrainers} />
        <Route path="/admins/home/trainers/Form/:id" component={FormTrainers} />

        <Route exact path="/admins/home/landing" component={AdminsHome} />
        <Route exact path="/admins/home/profile" component={AdminsProfile} />

        {/* //Members Routes */}
        <Route exact path="/members/home/landing" component={MembersHome} />
        <Route exact path="/members/home/profile" component={MembersProfile} />
        <Route path="/members/home/edit/:id" component={MembersEdit} />
        <Route exact path="/members/home/classes" component={Classes} />
        <Route exact path="/members/home/subscriptions" component={Subscriptions} />
        <Route exact path="/members/home/subscriptions/form" component={SubscriptionForm} />
        <Route exact path="/members/home/activities" component={MembersActivities} />

        <Route path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default Layout;
