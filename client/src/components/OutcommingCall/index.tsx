import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './styles.css';

const OutcommingCall = () => {
  const userToCallUsername = useSelector((state: RootState) => state.users.userToWrite.username);

  return (
    <div className='outcommingCallContainer'>
      <audio autoPlay loop src='sounds/outcommingCall.mp3' />
        Waiting for {userToCallUsername} to answer
    </div>
  );
};

export default OutcommingCall;
