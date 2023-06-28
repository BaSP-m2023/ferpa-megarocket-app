import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Admins from 'Components/Admins';
import AdminsForm from 'Components/Admins/Form';

const MemberRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${url}/admins`} component={Admins} />
      <Route exact path={`${url}/admins/form`} component={AdminsForm} />
      <Route exact path={`${url}/admins/form/:id`} component={AdminsForm} />
    </Switch>
  );
};

export default MemberRoutes;
