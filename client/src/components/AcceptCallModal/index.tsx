import React, { useContext } from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { SocketContext } from '../../context/socketContext';

interface IAcceptModal {
    callingUserId: string;
    changeAcceptState: CallableFunction;
    video: boolean
}

const AcceptCallModal = ({callingUserId, video, changeAcceptState}: IAcceptModal) => {
  const callingUser = useSelector((state: RootState) => state.users.users.find((user) => user.userId === +callingUserId));
  const socket = useContext(SocketContext);

  const handleAccept = (e: React.MouseEvent<HTMLButtonElement>, isAccepted: boolean) => {
    socket.emit('callResponseToServer', {
      to: callingUserId,
      accepted: isAccepted,
      video,
    });
    changeAcceptState({
      userId: '',
      isOpen: false,
      video,
    });
  };

  return (
    <div className='acceptCallModalContainer'>
      <audio autoPlay loop src='sounds/incommingCall.mp3' />
        Incoming Call from {callingUser?.username}
      <div className='acceptCallModalButtons'>
        <Button variant="contained" className='acceptCallButton' type='button' size='small' onClick={(e) => handleAccept(e, true)} ><FontAwesomeIcon icon={faPhone}/></Button>
        <Button className='declineCallButton' type='button' size='small' onClick={(e) => handleAccept(e, false)}><FontAwesomeIcon icon={faPhone}/></Button>
      </div>
    </div>
  );
};

export default AcceptCallModal;
