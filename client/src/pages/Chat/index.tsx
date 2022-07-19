import './styles.css';
import { useContext, useEffect, useState } from 'react';
import InputArea from '../../components/InputArea';

import UsersTable from '../../components/UsersTable';
import apiConfig from '../../apiConfig/apiConfig';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import SideMenu from '../../components/SideMenu';
import ChatMessageZone from '../../components/ChatMessageZone';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Profile from '../../components/Profile';
import { findUsersByNickname } from '../../utils/inputAreaFunctions';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../Modal/Modal';
import VideoChat from '../../components/VideoChat';
import { SocketContext } from '../../context/socketContext';
import AcceptCallModal from '../../components/AcceptCallModal';
import { IRequest } from '../../types/rtc';

function Chat () {
  const [rtcState, setRtcState] = useState({
    offer: undefined,
    isOpen: false,
  });
  const [acceptState, setAcceptState] = useState({
    userId: '',
    isOpen: false,
    video: false,
  });
  const navigate = useNavigate();
  const userToWrite = useSelector((store: RootState) => store.users.userToWrite);
  const socket = useContext(SocketContext);
  const activeUser = useSelector((store: RootState) => store.activeUser);

  const changeAcceptState = (newState: {
    userId: string;
    isOpen: boolean;
    video: boolean;
}) => {
    setAcceptState(newState);
  };

  const handleCloseModal = () => {
    socket.emit('callResponseToServer', {to: acceptState.userId, accepted: false});
    setAcceptState({
      userId: '',
      isOpen: false,
      video: false,
    });
  };

  useEffect(() => {
    if (activeUser.userId !== 0) {
      socket.emit('joinPrivateRoom', activeUser.userId.toString());
    }

    socket.on('discardCallFromCallerToServer', () => {
      setAcceptState({
        userId: '',
        isOpen: false,
        video: false,
      });
    });

    socket.on('callRequestToClient', (data: IRequest) => {
      setAcceptState({
        userId: data.from,
        isOpen: true,
        video: data.video,
      });
    });

    socket.on('joinRTCRoomToClient', (data) => {
      if (!rtcState.isOpen) {
        setRtcState({
          isOpen: true,
          offer: data,
        });
      }

    });
    socket.on('disconnectRTCToClient', () => {
      setRtcState({
        isOpen: false,
        offer: undefined,
      });
    });
    return (
      () => {socket.emit('leavePrivateRoom', activeUser.userId);}
    );
  }, []);

  useEffect(()=> {
    (async ()=> {
      try {
        await apiConfig.checkJwt();
      } catch (e) {
        navigate('/login');
      }
    })();
  }, []);

  return (
    <div className='chat-container'>
      <div className='chat-usersBlock'>
        <SideMenu />
        <InputArea type='string' submitFunc={findUsersByNickname} needToReset={false} icon={faSearch} />
        <UsersTable />
      </div>
      {userToWrite.userId === 0 ? <Profile /> : <ChatMessageZone />}
      <Modal handleClose={() => setRtcState({isOpen: false, offer: undefined,
      })} isOpen={rtcState.isOpen}>
        <VideoChat offerFrom={rtcState.offer} video={acceptState.video}/>
      </Modal>
      <Modal handleClose={handleCloseModal} isOpen={acceptState.isOpen}>
        <AcceptCallModal callingUserId={acceptState.userId} video={acceptState.video} changeAcceptState={changeAcceptState} />
      </Modal>
    </div>
  );
}

export default Chat;
