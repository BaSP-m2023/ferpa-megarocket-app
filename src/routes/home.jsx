import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Login from 'Components/Home/Login';
import Signup from 'Components/Members/Create';
import Home from 'Components/Home';

const HomeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${url}`} component={Home} />
      <Route exact path={`${url}/login`} component={Login} />
      <Route exact path={`${url}/signup`} component={Signup} />
    </Switch>
  );
};

export default HomeRoutes;
