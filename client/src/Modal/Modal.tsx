import React, { useEffect } from 'react';
import Portal from '../Portal/Portal';
import './styles.css';

interface IModal {
    children: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
}

const Modal = ({ children, isOpen, handleClose }: IModal) => {

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' ? handleClose() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <Portal wrapperId='modal'>
      <div className="modal">
        <button onClick={handleClose} className="modal-closeBtn">
        Close
        </button>
        <div className='modal-content'>{children}</div>
      </div>
    </Portal>
  );
};

export default Modal;
