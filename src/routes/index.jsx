import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import { useDispatch } from 'react-redux';
import { tokenListener } from '../helper/firebase';
import { getAuth } from '../redux/auth/thunks';
import Loader from 'Components/Shared/Loader';

const AdminsRoutes = lazy(() => import('./admins'));
const SuperAdminsRoutes = lazy(() => import('./superAdmin'));
const MembersRoutes = lazy(() => import('./members'));
const HomeRoutes = lazy(() => import('./home'));

const Routes = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    tokenListener();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getAuth(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Switch>
          <PrivateRoute path="/admins" role="ADMIN" component={AdminsRoutes} />
          <PrivateRoute path="/member" role="MEMBER" component={MembersRoutes} />
          <PrivateRoute path="/super-admins" role="SUPER_ADMIN" component={SuperAdminsRoutes} />
          <Route path="/home" component={HomeRoutes} />
          <Redirect to="/home" />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
