import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Routes from 'routes';
import Home from 'Components/Home';
import Admins from 'Components/Admins';
import AdminForm from 'Components/Admins/Form';

const routes = [
  {
    name: 'Home',
    path: '/super-admin'
  },
  {
    name: 'Admins',
    path: '/super-admin/admins'
  }
];

const SuperAdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Routes routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Route exact path={`${url}/admins`} component={Admins} />
        <Route exact path={`${url}/admins/form`} component={AdminForm} />
        <Route exact path={`${url}/admins/form/:id`} component={AdminForm} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Routes>
  );
};

export default SuperAdminRoutes;
