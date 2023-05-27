import styles from './super-admins.module.css';

const data = [
  { email: 'asdfasdf@gmail.com', password: '1234' },
  { email: 'ghlkhgfnh@hotmail.com', password: '324235' }
];

function SuperAdmins() {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.email}</td>
                  <td className={styles.pass}>{item.password}</td>
                  <td>
                    <button>Edit</button>
                  </td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default SuperAdmins;
