import React from 'react';
import styles from './activities.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getActivities } from '../../../redux/activities/thunks';

const Activities = () => {
  const { data } = useSelector((state) => state.activities);
  const dispatch = useDispatch();

  useEffect(() => {
    getActivities(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.header}>Activities</h2>
      <div className={styles.body}>
        {data.map((activity) => {
          return (
            <div className={styles.activity} key={activity._id}>
              <div className={styles.activityImage}>
                <img
                  src="https://st.depositphotos.com/1708346/1404/i/450/depositphotos_14043607-stock-photo-college-gym-49ers-football-team.jpg"
                  alt="Some activity"
                  className={styles.image}
                />
              </div>
              <div className={styles.activityData}>
                <h3 className={styles.activityName}>{activity.name}</h3>
                <p className={styles.activityDescription}>{activity.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Activities;
