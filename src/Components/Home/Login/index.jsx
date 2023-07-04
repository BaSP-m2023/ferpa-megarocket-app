import { useEffect } from 'react';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';
import { Input } from 'Components/Shared/Inputs';
import { useForm } from 'react-hook-form';
import Button from 'Components/Shared/Button';
import Aside from '../../Shared/Aside';
import { login } from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const { isOn } = useSelector((state) => state.aside);
  const schema = Joi.object({
    email: Joi.string(),
    password: Joi.string()
  });

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      history.push('/admin/profile');
    }
    if (user?.role === 'MEMBER') {
      history.push('/member/profile');
    }
    if (user?.role === 'SUPER-ADMIN') {
      history.push('/super-admin/admins');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });
  const handleLogin = (data) => {
    dispatch(login(data));
  };

  return (
    <section className={styles.container}>
      {isOn && <Aside />}
      <div className={styles.login}>
        <div className={styles.loginBox}>
          <div>
            <h2 className={styles.title}>Login</h2>
          </div>
          <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
            <div className={styles.inputs}>
              <div className={styles.fieldset}>
                <img src="../../assets/images/mail.svg" alt="email icon"></img>
                <Input
                  register={register}
                  nameValue={'email'}
                  type={'text'}
                  placeholder={'Email:'}
                  error={errors.email?.message}
                />
              </div>
              <div className={styles.fieldset}>
                <img src="../../assets/images/lock.svg" alt="password icon"></img>
                <Input
                  register={register}
                  nameValue={'password'}
                  type={'password'}
                  placeholder={'Password:'}
                  error={errors.password?.message}
                />
              </div>
            </div>
            <Button text={'Continue'} variant={'add'} submitting />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
