import React from 'react';
import styles from './modal.module.css';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <span className={styles.modalCloseBtn} onClick={() => onClose()}>
            &times;
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
