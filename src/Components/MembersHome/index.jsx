import React from 'react';
import { useEffect } from 'react';
import { getMembers } from '../../redux/members/thunks';
import { useSelector, useDispatch } from 'react-redux';
import styles from './home.module.css';

const MembersHome = () => {
  const { data: members } = useSelector((state) => state.members);
  const firstMember = members[0];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        <p className={styles.welcome}>
          ¡Welcome {firstMember?.lastName}, {firstMember?.firstName}!
        </p>
      </div>
    </section>
  );
};

export default MembersHome;
