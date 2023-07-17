import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import { useDispatch } from 'react-redux';
import { tokenListener } from '../helper/firebase';
import { getAuth } from '../redux/auth/thunks';
import Loader from 'Components/Shared/Loader';
import Header from 'Components/Shared/Header';
import Footer from 'Components/Shared/Footer';
import styles from 'Components/Home/home.module.css';

const AdminsRoutes = lazy(() => import('./admins'));
const SuperAdminsRoutes = lazy(() => import('./superAdmin'));
const MembersRoutes = lazy(() => import('./members'));
const TrainersRoutes = lazy(() => import('./trainers'));
const HomeRoutes = lazy(() => import('./home'));
const ChangePass = lazy(() => import('Components/Home/ChangePass'));

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
    <Router>
      <Header />
      <Suspense
        fallback={
          <div className={styles.fallback}>
            <Loader />
          </div>
        }
      >
        <Switch>
          <PrivateRoute path="/admin" role="ADMIN" component={AdminsRoutes} />
          <PrivateRoute path="/member" role="MEMBER" component={MembersRoutes} />
          <PrivateRoute path="/trainer" role="TRAINER" component={TrainersRoutes} />
          <PrivateRoute path="/super-admin" role="SUPER-ADMIN" component={SuperAdminsRoutes} />
          <Route path="/home" component={HomeRoutes} />
          <Route path="/change_pass" component={ChangePass} />
          <Redirect to="/home" />
        </Switch>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default Routes;
