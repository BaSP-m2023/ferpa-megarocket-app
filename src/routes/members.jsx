import { Switch, Route, useRouteMatch } from 'react-router-dom';
import MemberProfile from 'Components/MembersHome/Profile';
import MembersEdit from 'Components/Members/Edit/EditMembers';
import Schedule from 'Components/Schedule';
import Activities from 'Components/MembersHome/Activities';

const MemberRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${url}/profile`} component={MemberProfile} />
      <Route exact path={`${url}/form/:id`} component={MembersEdit} />
      <Route exact path={`${url}/schedule`} component={Schedule} />
      <Route exact path={`${url}/activities`} component={Activities} />
    </Switch>
  );
};

export default MemberRoutes;
