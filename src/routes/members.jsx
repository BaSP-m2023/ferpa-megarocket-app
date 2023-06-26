import { Switch, Route, useRouteMatch } from 'react-router-dom';
import MemberProfile from 'Components/MembersHome/Profile';
import MembersEdit from 'Components/Members/Edit/EditMembers';
import Classes from 'Components/Classes';
import Subscriptions from 'Components/Subscriptions';
import SubscriptionForm from 'Components/Subscriptions/Form';
import Activities from 'Components/MembersHome/Activities';

const MemberRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${url}/profile`} component={MemberProfile} />
      <Route exact path={`${url}/form/:id`} component={MembersEdit} />
      <Route exact path={`${url}/classes`} component={Classes} />
      <Route exact path={`${url}/subscriptions`} component={Subscriptions} />
      <Route exact path={`${url}/subscriptions/form`} component={SubscriptionForm} />
      <Route exact path={`${url}/activities`} component={Activities} />
    </Switch>
  );
};

export default MemberRoutes;
