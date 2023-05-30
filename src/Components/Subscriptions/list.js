// import React, { useState } from 'react';
// import styles from './subscriptions.module.css';
// import Table from './table';
// import Button from './button';
// import Form from './form';

// const List = ({ subscriptions, onDelete, onCreate, getClassID, getMemberID }) => {
//   const [showForm, setShowForm] = useState(false);

//   const handleButtonClick = () => {
//     setShowForm(!showForm);
//   };

//   return (
//     <section className={styles.list}>
//       <header className={styles.header}>
//         <h1 className={styles.title}>Subscriptions</h1>
//         <Button onClick={handleButtonClick} />
//       </header>
//       <Table subscriptions={subscriptions} onDelete={onDelete} />
//       {showForm && <Form onCreate={onCreate} getClassID={getClassID} getMemberID={getMemberID} />}
//     </section>
//   );
// };

// export default List;
