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

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${url}/profile`} component={AdminsProfile} />
      <Route exact path="/reports" component={AdminsReports} />
      <Route exact path="/form/:id" component={AdminsForm} />

      <Route exact path="/activities" component={Activities} />
      <Route exact path="/activities/form" component={ActivitiesForm} />
      <Route exact path="/activities/form/:id" component={ActivitiesForm} />

      <Route exact path="/classes" component={Classes} />
      <Route exact path="/classes/form/:id" component={Form} />
      <Route exact path="/classes/form" component={Form} />

      <Route exact path="/members" component={Members} />
      <Route exact path="/members/form" component={MembersCreate} />
      <Route exact path="/members/form/:id" component={MembersEdit} />

      <Route exact path="/subscriptions" component={Subscriptions} />
      <Route exact path="/subscriptions/form" component={SubscriptionForm} />
      <Route exact path="/subscriptions/form/:id" component={SubscriptionForm} />

      <Route exact path="/trainers" component={Trainers} />
      <Route exact path="/trainers/form" component={FormTrainers} />
      <Route exact path="/trainers/form/:id" component={FormTrainers} />
    </Switch>
  );
};

export default AdminRoutes;
