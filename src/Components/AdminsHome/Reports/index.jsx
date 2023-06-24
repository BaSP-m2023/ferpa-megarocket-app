import React, { useEffect } from 'react';
import styles from './reports.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getTrainers } from 'redux/trainers/thunks';
import { getMembers } from 'redux/members/thunks';
import { getClasses } from 'redux/classes/thunks';
import { getSubscriptions } from 'redux/subscriptions/thunks';

const Reports = () => {
  const { trainers } = useSelector((state) => state.trainers);
  const { classes } = useSelector((state) => state.classes);
  const { subs } = useSelector((state) => state.subscriptions);
  const members = useSelector((state) => state.members.data);
  const membersActive = members.filter((member) => member.isActive === true).length;
  const trainersSalary = trainers.reduce((acc, trainer) => acc + trainer.salary, 0);
  const dispatch = useDispatch();

  useEffect(() => {
    getTrainers(dispatch);
    dispatch(getMembers());
    dispatch(getClasses());
    getSubscriptions(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  console.log(mostPopularClass);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Reports</h1>
        <section className={styles.repcontainer}>
          <h2 className={styles.subtitle}>Trainers</h2>
          <div className={styles.reports}>
            <p>
              Trainers: <span>{trainers.length}</span>
            </p>
            <p>
              Total of Salaries <span>$ {trainersSalary}</span>
            </p>
            <p>
              Average salary <span>$ {(trainersSalary / trainers.length).toFixed(2)}</span>
            </p>
          </div>
        </section>
        <section className={styles.repcontainer}>
          <h2 className={styles.subtitle}>Members Reports </h2>
          <div className={styles.reports}>
            <p>
              Members: <span>{members.length}</span>
            </p>
            <p>
              Members Active: <span>{membersActive}</span>
            </p>
            <p></p>
          </div>
          <h3>Only Classes = {totalMembership['Only Classes'] || 0}</h3>
          <h3>Classic = {totalMembership['Classic'] || 0}</h3>
          <h3>Black = {totalMembership['Black'] || 0}</h3>
        </section>
        <section className={styles.repcontainer}>
          <h2 className={styles.subtitle}>Clases Reports {classes.length}</h2>
          {subs.length > 1 && classes ? (
            mostPopularClass.map((item) => (
              <div key={item.value}>
                <p>Activity: {classes.find((clas) => clas._id === item.value).activityId?.name}</p>
                <p>
                  Trainer: {classes.find((clas) => clas._id === item.value).trainerId?.firstName}
                </p>
                <p>Day: {classes.find((clas) => clas._id === item.value).day}</p>
                <p>Hour: {classes.find((clas) => clas._id === item.value).hour}</p>
                <p>Members subscribed: {item.reps}</p>
              </div>
            ))
          ) : (
            <p></p>
          )}
          <div></div>
        </section>
      </div>
    </div>
  );
};

export default Reports;
