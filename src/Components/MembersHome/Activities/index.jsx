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
      <div className={styles.body}>
        {data.map((activity) => {
          return (
            <div className={styles.activity} key={activity._id}>
              <div className={styles.activityImage}>
                {(() => {
                  switch (activity.name) {
                    case 'Boxing':
                      return (
                        <img
                          src={'../../assets/images/boxing.jpg'}
                          alt={'Boxing'}
                          className={styles.image}
                        />
                      );
                    case 'Spinning':
                      return (
                        <img
                          src={'../../assets/images/spinning.jpg'}
                          alt={'Spinning'}
                          className={styles.image}
                        />
                      );
                    case 'Crossfit':
                      return (
                        <img
                          src={'../../assets/images/crossfit.jpg'}
                          alt={'Crossfit'}
                          className={styles.image}
                        />
                      );
                    case 'Functional training':
                      return (
                        <img
                          src={'../../assets/images/functional.jpg'}
                          alt={'Functional'}
                          className={styles.image}
                        />
                      );
                    case 'Weightlifting':
                      return (
                        <img
                          src={'../../assets/images/muscle.jpg'}
                          alt={'Functional'}
                          className={styles.image}
                        />
                      );
                    default:
                      return (
                        <img
                          src="https://st.depositphotos.com/1708346/1404/i/450/depositphotos_14043607-stock-photo-college-gym-49ers-football-team.jpg"
                          alt="Some activity"
                          className={styles.image}
                        />
                      );
                  }
                })()}
                {/* (switch (activity.name) {
                  case 'Boxing': return {
                    <img
                  src="https://st.depositphotos.com/1708346/1404/i/450/depositphotos_14043607-stock-photo-college-gym-49ers-football-team.jpg"
                  alt="Some activity"
                  className={styles.image}
                />
                  }

                  }
                )
                <img
                  src="https://st.depositphotos.com/1708346/1404/i/450/depositphotos_14043607-stock-photo-college-gym-49ers-football-team.jpg"
                  alt="Some activity"
                  className={styles.image}
                /> */}
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
