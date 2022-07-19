import React from 'react';
import './styles.css';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ICheckViewed {
    isViewed: boolean;
    from?: number;
    to?: number;
}

const CheckViewed = ({isViewed, from, to}: ICheckViewed) => {

  if (from && to) {
    if (from === to) {
      if (isViewed) {
        return <FontAwesomeIcon icon={faCheckDouble} className='chat-checkIcon' />;
      }
      return <FontAwesomeIcon icon={faCheck} className='chat-checkIcon' />;
    }
    return null;
  }
  if (isViewed) {
    return <FontAwesomeIcon icon={faCheckDouble} className='chat-checkIcon' />;
  }
  return <FontAwesomeIcon icon={faCheck} className='chat-checkIcon' />;

};

export default CheckViewed;
