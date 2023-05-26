import { useEffect, useState } from 'react';
import styles from './activities.module.css';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onClick = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API}/api/activities/`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        description: description,
        isActive: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response.body);
        return response.json();
      })
      .then((response) => {
        console.log(response.body);
        setActivities(response);
        setName('');
        setDescription('');
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/activities/`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setActivities(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Activities</h2>
      <div>
        {activities.map((activity) => {
          return (
            <h3 key={activity._id}>
              {activity.name}: {activity.description}
            </h3>
          );
        })}
      </div>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Activity name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          type="text"
          placeholder="Activity description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button onClick={onClick} type="submit">
          Add
        </button>
      </form>
    </section>
  );
}

export default Activities;
