import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Routes from 'routes';
import Home from 'Components/Home';

const routes = [
  {
    name: 'Home',
    path: '/members'
  }
];

const MemberRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Routes routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Routes>
  );
};

export default MemberRoutes;
