import React, { useEffect } from 'react';
import styles from './reports.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getMembers } from 'redux/members/thunks';
import { getClasses } from 'redux/classes/thunks';
import { getSubscriptions } from 'redux/subscriptions/thunks';
import Loader from 'Components/Shared/Loader';

const Reports = () => {
  const { classes } = useSelector((state) => state.classes);
  const { subs } = useSelector((state) => state.subscriptions);
  const members = useSelector((state) => state.members.data);
  const classesLoading = useSelector((state) => state.classes.isLoading);
  const subsLoading = useSelector((state) => state.subscriptions.isPending);
  const membersLoading = useSelector((state) => state.members.isPending);
  const membersActive = members.filter((member) => member.isActive === true).length;
  const membershipsActive = members.filter((member) => member.isMembershipActive === true).length;
  const dispatch = useDispatch();

  const countMemberships = (members, membership) => {
    const count = {};
    for (let i = 0; i < members.length; i++) {
      const type = members[i][membership];
      count[type] = (count[type] || 0) + 1;
    }
    return count;
  };
  const mostPopular = (subs) => {
    const counter = {};
    let amount = 0;
    let popularSub = [];

    subs.forEach((sub) => {
      const clas = sub.classId;
      if (clas) {
        const value = clas._id;
        counter[value] = (counter[value] || 0) + 1;
        if (counter[value] > amount) {
          amount = counter[value];
          popularSub = [{ value, reps: counter[value] }];
        } else if (counter[value] === amount) {
          popularSub.push({ value, reps: counter[value] });
        }
      }
    });
    return popularSub;
  };
  const mostPopularClass = mostPopular(subs);
  const totalMembership = countMemberships(members, 'membership');

  useEffect(() => {
    dispatch(getMembers());
    dispatch(getClasses());
    getSubscriptions(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (classesLoading || membersLoading || subsLoading) {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Reports</h1>
          <section className={styles.repcontainerLoading}>
            <h2 className={styles.subtitle}>Members</h2>
          </section>
          <section className={styles.repcontainerLoadingMiddle}>
            <div className={styles.margin}>
              <h2 className={styles.subtitle}>Memberships</h2>
              <div className={styles.centered}>
                <Loader />
              </div>
            </div>
          </section>
          <section className={styles.repcontainerBottom}>
            <h2 className={styles.subtitle}>Popular classes</h2>
          </section>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Reports</h1>
        </div>
        <section className={styles.repcontainer}>
          <h2 className={styles.subtitle}>Members</h2>
          {members.length > 0 ? (
            <div className={styles.reports}>
              <p className={styles.largerTop}>
                Total members: <span>{members.length}</span>
              </p>
              <p className={styles.largerTop}>
                Members active: <span>{membersActive}</span>
              </p>
              <p className={styles.largerTop}>
                Memberships active: <span>{membershipsActive}</span>
              </p>
            </div>
          ) : (
            <p className={styles.subtitle}>No members found</p>
          )}
        </section>
        <section className={styles.repcontainer}>
          <h2 className={styles.subtitle}>Memberships</h2>
          {members.length > 0 ? (
            <div className={styles.reports}>
              <p className={styles.smallerBottom}>
                Only Classes: {totalMembership['Only Classes'] || 0}
              </p>
              <p className={styles.smallerBottom}>Classic: {totalMembership['Classic'] || 0}</p>
              <p className={styles.smallerBottom}>Black: {totalMembership['Black'] || 0}</p>
            </div>
          ) : (
            <p className={styles.subtitle}>No memberships found</p>
          )}
        </section>
        <section className={styles.repcontainerBottom}>
          <h2 className={styles.subtitle}>
            {mostPopularClass.length === 1 ? 'Popular class' : 'Popular classes'}
          </h2>
          <div className={styles.popularContainer}>
            {subs.length > 1 && classes ? (
              mostPopularClass.map((item, index) => (
                <div key={item.value} className={styles.popular}>
                  <p className={styles.index}>{index + 1}</p>
                  <p className={styles.reportText}>
                    Activity: {classes.find((clas) => clas._id === item.value).activityId?.name}
                  </p>
                  <p className={styles.reportText}>
                    Trainer: {classes.find((clas) => clas._id === item.value).trainerId?.firstName}
                  </p>
                  <p className={styles.reportText}>
                    Day: {classes.find((clas) => clas._id === item.value).day}
                  </p>
                  <p className={styles.reportText}>
                    Hour: {classes.find((clas) => clas._id === item.value).hour}
                  </p>
                  <p className={styles.reportText}>Members subscribed: {item.reps}</p>
                </div>
              ))
            ) : (
              <p className={styles.subtitle}>No classes found</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Reports;
