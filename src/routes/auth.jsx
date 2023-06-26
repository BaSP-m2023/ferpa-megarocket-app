import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Routes from 'routes';
import Login from 'Components/Auth/Login';

const routes = [
  {
    name: 'Login',
    path: '/home/login'
  }
];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Routes routes={routes}>
      <Switch>
        <Route path={`${url}/login`} component={Login} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </Routes>
  );
};

export default AuthRoutes;
