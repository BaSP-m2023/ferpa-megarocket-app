import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect, useLocation } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { tokenListener } from '../helper/firebase';
import { getAuth } from '../redux/auth/thunks';
import Loader from 'Components/Shared/Loader';
import Aside from 'Components/Shared/Aside';
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
  const location = useLocation();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  const { isOn } = useSelector((state) => state.aside);

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
      <div className={styles.container}>
        <div className={styles.aside}>{isOn && <Aside />}</div>
        <div className={styles.fullWidth}>
          <Header />
          <Suspense
            fallback={
              <div
                className={
                  location.pathname.includes('/home') ? styles.fallbackHome : styles.fallback
                }
              >
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
        </div>
      </div>
    </Router>
  );
};

export default Routes;
