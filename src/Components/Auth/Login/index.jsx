import styles from './login.module.css';
import { Link } from 'react-router-dom';
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
  const { isPending, user, error, message, isAuthPending } = useSelector((state) => state.auth);
  const schema = Joi.object({
    email: Joi.string(),
    password: Joi.string()
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });
  const handleLogin = (data) => {
    console.log(data);
    dispatch(login(data));
  };
  console.log(isPending);
  console.log(user);
  console.log(error);
  console.log(message);
  console.log(isAuthPending);

  return (
    <section className={styles.container}>
      <Aside />
      <div className={styles.login}>
        <div className={styles.loginBox}>
          <div>
            <h2 className={styles.title}>Login</h2>
          </div>
          <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
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
            <Button text={'Continue'} variant={'add'} submitting />
          </form>
        </div>
        <Link to="/member/profile">
          <button>Members</button>
        </Link>
        <Link to="/admin/profile">
          <button>Admins</button>
        </Link>
      </div>
    </section>
  );
}

export default Login;
