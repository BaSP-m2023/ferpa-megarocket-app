import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { Input } from 'Components/Shared/Inputs';
import { useForm } from 'react-hook-form';
import Button from 'Components/Shared/Button';
import Aside from '../../Shared/Aside';

function Login() {
  const { register, handleSubmit } = useForm({});

  return (
    <section className={styles.container}>
      <Aside />
      <div className={styles.login}>
        <div className={styles.loginBox}>
          <div>
            <h2 className={styles.title}>Login</h2>
          </div>
          <form onSubmit={handleSubmit()} className={styles.form}>
            <div className={styles.fieldset}>
              <img src="../../assets/images/mail.svg" alt="email icon"></img>
              <Input register={register} nameValue={'email'} type={'text'} placeholder={'Email:'} />
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
          </form>
          <Button text={'Continue'} variant={'add'} submitting />
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
