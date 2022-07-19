import React from 'react';
import { createPortal } from 'react-dom';

interface IPortal {
    children: React.ReactNode,
    wrapperId: string;
}

const Portal = ({children, wrapperId}: IPortal) => {
  const wrapperElement = document.getElementById(wrapperId);
  if (wrapperElement) {
    return createPortal(children, wrapperElement);
  }
  return null;
};

export default Portal;
