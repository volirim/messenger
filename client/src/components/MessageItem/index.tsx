/* eslint-disable no-unused-vars */
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import useOnScreen from '../../hooks/useOnScreen';
import apiConfig from '../../apiConfig/apiConfig';
import { changeIsViewed } from '../../store/slices/messages';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckViewed from '../CheckViewed';
import { SocketContext } from '../../context/socketContext';
export  interface Imessage {
    id: number;
    isViewed: boolean;
    from: string;
    message: string;
    room?: string;
    time: any;
    type: string;
}

const MessageItem = ({ from, message, time, id, isViewed, type }: Imessage) => {
  const activeUser = useSelector((store: RootState) => store.activeUser);
  const userToWrite = useSelector((store: RootState) => store.users.userToWrite);
  const isViewedRef = useRef<HTMLDivElement>(null);
  const observer = useOnScreen(isViewedRef);
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(()=> {
    if (observer === true && isViewed === false && parseInt(from, 10) !== activeUser.userId) {
      (async () => {
        const response = await apiConfig.setViewed({id, isViewed: true});
        if (response) {
          socket.emit('viewedMessageToServer', { from: userToWrite.userId, to: activeUser.userId, messageId: id });
          dispatch(changeIsViewed({id, isViewed: true}));
        }
      })();
    }
  }, [observer]);

  return (
    <div className={parseInt(from, 10) === activeUser.userId ? 'messageContainer userMessageContainer' : 'messageContainer'} style={{overflow: 'visible'}}>
      <Avatar className='messageAvatar'>{from === activeUser.userId.toString() ? activeUser.username.slice(0, 2) : userToWrite.username.slice(0, 2)}</Avatar>
      <div>
        <p className={parseInt(from, 10) === activeUser.userId ? 'messageTime' : 'messageTime companionMessageTime'}>{`${time.hours}:${time.minutes}`}
        </p>
        <Card className={parseInt(from, 10) === activeUser.userId ? 'chat-message chat-userMessage' : 'chat-message'} style={{overflow: 'visible'}}>
          <CardContent style={{padding: '0'}} className={from === activeUser.userId.toString() ? 'chat-userMessageInner' : 'chat-messageInner'} ref={isViewedRef}>
            {type === 'string' ? <Typography variant="body2" className='chat-text'>{message}</Typography> : null}
            {type === 'image' ? <img src={message} style={{maxHeight: '200px'}} /> : null}
            {type === 'video' ? <video src={message} controls style={{maxHeight: '150px'}} /> : null}
          </CardContent>
          {parseInt(from, 10) === activeUser.userId ? <div className='message-checkContainer'>
            <CheckViewed isViewed={isViewed} from={parseInt(from, 10)} to={activeUser.userId} />
          </div> : null}
        </Card>
      </div>
    </div>
  );
};

export default MessageItem;
