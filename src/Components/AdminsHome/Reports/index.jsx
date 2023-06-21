import React, { useEffect } from 'react';
import styles from './reports.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getTrainers } from 'redux/trainers/thunks';
import { getMembers } from 'redux/members/thunks';
import { getClasses } from 'redux/classes/thunks';

const Reports = () => {
  const { trainers } = useSelector((state) => state.trainers);
  const members = useSelector((state) => state.members.data);
  const { classes } = useSelector((state) => state.classes);
  const dispatch = useDispatch();
  const trainersSalary = trainers.reduce((acc, trainer) => acc + trainer.salary, 0);

  useEffect(() => {
    getTrainers(dispatch);
    dispatch(getMembers());
    dispatch(getClasses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.reports}>
        <h1 className={styles.title}>Reports</h1>
        <h2>Trainers Reports</h2>
        <div>
          <p>
            Amounts of traniers <span>{trainers.length}</span>
          </p>
          <p>
            Total of Salaries <span>{trainersSalary}</span>
          </p>
          <p>
            Average salary <span>{trainersSalary / trainers.length}</span>
          </p>
        </div>
        <h2>Members Reports {members.length}</h2>
        <h2>Clases Reports {classes.length}</h2>
      </div>
    </div>
  );
};

export default Reports;
