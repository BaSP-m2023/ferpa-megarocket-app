import React from 'react';
import styles from './modal.module.css';

const Modal = ({ isOpen, onClose, title, text, children, success, warning }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={success ? styles.modalOverlaySuccess : styles.modalOverlay}>
      <div className={`${styles.modalContent} ${success ? styles.modalSuccess : ''}`}>
        <div className={styles.modalHeader}>
          <h2 className={`${styles.modalTitle} ${warning ? styles.modalWarn : ''}`}>{title}</h2>
          <span className={styles.modalCloseBtn} onClick={() => onClose()}>
            &times;
          </span>
        </div>
        <p className={styles.modalText}>{text}</p>
        <div className={styles.modalChildren}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
