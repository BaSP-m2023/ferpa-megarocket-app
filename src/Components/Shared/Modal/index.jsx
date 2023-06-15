import React from 'react';
import styles from './modal.module.css';

const Modal = ({ isOpen, onClose, title, text, children, success, warning, error }) => {
  if (!isOpen && !(success || error)) {
    return null;
  }

  return (
    <div
      className={`${success || error ? styles.modalOverlayPop : styles.modalOverlay} ${
        isOpen ? styles.open : ''
      }`}
    >
      <div
        className={`${styles.modalContent} ${success ? styles.modalSuccess : ''} ${
          error ? styles.modalError : ''
        } ${isOpen ? styles.open : ''}`}
      >
        <div className={styles.modalHeader}>
          <h2 className={`${styles.modalTitle} ${warning ? styles.modalWarn : ''}`}>{title}</h2>
          <span className={styles.modalCloseBtn} onClick={() => onClose()}>
            &times;
          </span>
        </div>
        {text ? <p className={styles.modalText}>{text}</p> : ''}
        {children ? <div className={styles.modalChildren}>{children}</div> : ''}
      </div>
    </div>
  );
};

export default Modal;
