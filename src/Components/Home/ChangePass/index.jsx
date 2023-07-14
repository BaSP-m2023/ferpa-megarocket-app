import styles from './pass.module.css';
import { Input } from 'Components/Shared/Inputs';
import Button from 'Components/Shared/Button';
import { useForm } from 'react-hook-form';
import { store } from 'redux/store';
import { updateMember } from 'redux/members/thunks';
import { updateAdmin } from 'redux/admins/thunks';
import { putTrainer as updateTrainer } from 'redux/trainers/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { checkPass } from 'redux/auth/thunks';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const ChangePass = () => {
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  const role = sessionStorage.getItem('role');
  const id = user._id;
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const schema = Joi.object({
    oldPass: Joi.string(),
    newPass: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/)
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });
  let redirect = '';
  if (role === 'MEMBER') {
    redirect = '/member/profile';
  } else if (role === 'ADMIN') {
    redirect = '/admin/profile';
  } else if (role === 'TRAINER') {
    redirect = '/trainer/profile';
  }

  const onSubmit = async (data) => {
    await dispatch(checkPass(data.oldPass));
    const updatedState = store.getState();
    const updatedCheck = updatedState.auth.passChecked;
    if (updatedCheck) {
      if (role === 'MEMBER') {
        await dispatch(updateMember(id, { password: data.newPass }));
        history.push(redirect);
      }
      if (role === 'ADMIN') {
        await updateAdmin(dispatch, id, { password: data.newPass });
        history.push(redirect);
      }
      if (role === 'TRAINER') {
        await updateTrainer(dispatch, id, { password: data.newPass });
        history.push(redirect);
      }
    } else {
      setError('Wrong Password');
    }
  };

  return (
    <section className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        data-testid={'changePass-container'}
      >
        <h2 className={styles.formTitle}>PASSWORD CHANGE</h2>
        <div className={styles.inputBox}>
          <Input
            nameValue={'oldPass'}
            type={'password'}
            labelText={'Current password'}
            register={register}
            onFocus={() => setError('')}
            error={error}
          />
        </div>
        <div className={styles.inputBox}>
          <Input
            nameValue={'newPass'}
            type={'password'}
            labelText={'New password'}
            register={register}
            error={errors.newPass?.message}
          />
        </div>
        <div className={styles.formBtns}>
          <Link to={redirect}>
            <Button variant={'white'} text={'Cancel'} testid={'cancel-btn'} />
          </Link>
          <Button variant={'add'} text="Confirm" submitting testid={'add-btn'} />
        </div>
      </form>
    </section>
  );
};

export default ChangePass;
