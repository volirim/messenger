/* eslint-disable no-unused-expressions */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../context/socketContext';
import { RootState } from '../../store/store';
import { ISocketIsTypingNotification } from '../../types/messages';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import Modal from '../../Modal/Modal';
import VideoChat from '../VideoChat';
import { IResponse } from '../../types/rtc';
import OutcommingCall from '../OutcommingCall';
import handleUserStatus from '../../utils/user';

const ChatWindowHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [waitingForAnswer, setWaitingForAnswer] = useState(false);
  const [userStatus, setUserStatus] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const activeUser = useSelector((store: RootState) => store.activeUser);
  const userToWrite = useSelector((store: RootState) => store.users.userToWrite);
  const socket = useContext(SocketContext);

  useEffect(()=> {

    const setStatus = async (id: string) => {
      const status = await handleUserStatus(id, userToWrite.userId);
      status ? setUserStatus(status) : setUserStatus('');
    };

    setStatus(userToWrite.userId.toString());

    socket.on('callResponseToClient', (data: IResponse) => {
      setWaitingForAnswer(false);
      setIsOpen(data.accepted);
      setIsVideo(data.video);
    });

    socket.on('disconnectRTCToClient', () => {
      setIsOpen(false);
    });

    socket.on('getUserStatus', async (payload: any) => {
      setStatus(payload.id);
    });

  }, []);

  useEffect(()=> {
    socket.on('isTypingToClient', async (data: ISocketIsTypingNotification)=> {
      if (userToWrite.userId === parseInt(data.from, 10)) {
        setIsTyping(data.isTyping);
      }
    });
    return () => {
      socket.removeListener('isTypingToClient');
    };
  }, [isTyping, userToWrite]);

  const handleCallButtonClick = (e: any, video: boolean) => {
    setWaitingForAnswer(true);
    socket.emit('callRequestToServer', {from: activeUser.userId, to: userToWrite.userId, video});
  };

  const handleCloseOutcommingCall = () => {
    socket.emit('discardCallFromCallerToServer', {
      to: userToWrite.userId,
    });
    setWaitingForAnswer(false);
  };

  return (
    <ListItem className='chatWindowHeaderContainer'>
      <ListItemIcon>
        <Avatar>{userToWrite.userId !== 0 ? userToWrite.username.slice(0, 2) : activeUser.username.slice(0, 2)}</Avatar>
      </ListItemIcon>
      <div>
        <ListItemText primary={userToWrite.userId !== 0 ? userToWrite.username : activeUser.username} />
        <ListItemText primary={isTyping ? '...typing' : userStatus} className='windowHeader-onlineText' />
      </div>
      <Button variant="contained" className='chat-button videoCallButton header-button' type='button' size='small' onClick={(e) => handleCallButtonClick(e, true)}><FontAwesomeIcon icon={faVideoCamera
      }/></Button>
      <Button variant="contained" className='chat-button header-button' type='button' size='small' onClick={(e) => handleCallButtonClick(e, false)}><FontAwesomeIcon icon={faPhone}/></Button>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <VideoChat video={isVideo} />
      </Modal>
      <Modal handleClose={handleCloseOutcommingCall} isOpen={waitingForAnswer}>
        <OutcommingCall />
      </Modal>
    </ListItem>
  );
};

export default ChatWindowHeader;
