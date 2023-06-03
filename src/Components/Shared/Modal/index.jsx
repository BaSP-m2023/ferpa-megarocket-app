import React from 'react';
import styles from './modal.module.css';

const Modal = ({ isOpen, onClose, variant, children }) => {
  /* const warning = variant === 'warning';
  const error = variant === 'error';
  const success = variant === 'success';
 */
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={
        styles.modalContainer
      } /* {`${styles.modalContainer} ${warning ? 'styles.modalWarning' : ''} ${
        error ? 'styles.modalError' : ''
      } ${success ? 'styles.modalSuccess' : ''}`} */
    >
      <div className={styles.modalContent}>
        <span onClick={() => onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
