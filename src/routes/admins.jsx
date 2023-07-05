import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Activities from 'Components/Activities';
import ActivitiesForm from 'Components/Activities/Form';
import Classes from 'Components/Classes';
import Form from 'Components/Classes/Form';
import Members from 'Components/Members';
import MembersCreate from 'Components/Members/Create';
import MembersEdit from 'Components/Members/Edit/EditMembers';
import Subscriptions from 'Components/Subscriptions';
import SubscriptionForm from 'Components/Subscriptions/Form';
import Trainers from 'Components/Trainers';
import FormTrainers from 'Components/Trainers/FormTrainers';
import AdminsProfile from 'Components/AdminsHome/Profile';
import AdminsReports from 'Components/AdminsHome/Reports';
import AdminsForm from 'Components/Admins/Form';

const AdminsRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${url}/profile`} component={AdminsProfile} />
      <Route exact path={`${url}/reports`} component={AdminsReports} />
      <Route exact path={`${url}/form/:id`} component={AdminsForm} />

      <Route exact path={`${url}/activities`} component={Activities} />
      <Route exact path={`${url}/activities/form`} component={ActivitiesForm} />
      <Route exact path={`${url}/activities/form/:id`} component={ActivitiesForm} />

      <Route exact path={`${url}/classes`} component={Classes} />
      <Route exact path={`${url}/classes/form/:id`} component={Form} />
      <Route exact path={`${url}/classes/form`} component={Form} />

      <Route exact path={`${url}/members`} component={Members} />
      <Route exact path={`${url}/members/form`} component={MembersCreate} />
      <Route exact path={`${url}/members/form/:id`} component={MembersEdit} />

      <Route exact path={`${url}/subscriptions`} component={Subscriptions} />
      <Route exact path={`${url}/subscriptions/form`} component={SubscriptionForm} />
      <Route exact path={`${url}/subscriptions/form/:id`} component={SubscriptionForm} />

      <Route exact path={`${url}/trainers`} component={Trainers} />
      <Route exact path={`${url}/trainers/form`} component={FormTrainers} />
      <Route exact path={`${url}/trainers/form/:id`} component={FormTrainers} />
    </Switch>
  );
};

export default AdminsRoutes;
