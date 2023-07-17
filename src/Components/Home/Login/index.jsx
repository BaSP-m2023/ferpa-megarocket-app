import { useEffect } from 'react';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';
import { Input } from 'Components/Shared/Inputs';
import { useForm } from 'react-hook-form';
import Button from 'Components/Shared/Button';
import Aside from '../../Shared/Aside';
import { login } from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { resetError } from 'redux/auth/action';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, error, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === 'ADMIN' && !error) {
      history.push('/admin/profile');
    }
    if (user?.role === 'MEMBER' && !error) {
      history.push('/member/profile');
    }
    if (user?.role === 'SUPER-ADMIN' && !error) {
      history.push('/super-admin/admins');
    }
    if (user?.role === 'TRAINER' && !error) {
      history.push('/trainer/profile');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const { register, handleSubmit } = useForm({});

  const handleLogin = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    dispatch(resetError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.container}>
      <Aside />
      <div className={styles.login}>
        <div className={styles.loginBox} data-testid={'login-container'}>
          <div>
            <h2 className={styles.title} data-testid={'login-title'}>
              Login
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className={styles.form}
            data-testid={'login-form'}
          >
            <div className={styles.inputs}>
              <div className={styles.fieldset}>
                <img src="../../assets/images/mail.svg" alt="email icon"></img>
                <Input
                  register={register}
                  nameValue={'email'}
                  type={'text'}
                  placeholder={'Email:'}
                />
              </div>
              <div className={styles.fieldset}>
                <img src="../../assets/images/lock.svg" alt="password icon"></img>
                <Input
                  register={register}
                  nameValue={'password'}
                  type={'password'}
                  placeholder={'Password:'}
                />
              </div>
            </div>
            <Button text={'Continue'} variant={'add'} submitting testid={'continue-btn'} />
          </form>
          <p className={styles.spaceForSignup}>
            {`Don't have an account? `}
            <span>
              <Link to="signup" className={styles.signup}>
                Sign up now!
              </Link>
            </span>
          </p>
          <div className={styles.spaceForError}>
            <p className={!error ? `${styles.errorHidden}` : `${styles.error}`}>
              <img src="../../../assets/images/warning.svg" alt="warning" /> {message}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
