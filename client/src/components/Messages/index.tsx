/* eslint-disable no-unused-vars */
import './styles.css';
import MessageItem, { Imessage } from '../MessageItem';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Virtuoso } from 'react-virtuoso';
import apiConfig from '../../apiConfig/apiConfig';
import { SocketContext } from '../../context/socketContext';
import { ISocketIsTypingNotification, ISocketNotification, ISocketViewed } from '../../types/messages';
import { fetchLastUser, fetchUsers } from '../../store/slices/users';
import { addMessage, changeIsViewed, fetchMessages } from '../../store/slices/messages';

const Messages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((store: RootState) => store.users.users);
  const activeUser = useSelector((store: RootState) => store.activeUser);
  const userToWrite = useSelector((store: RootState) => store.users.userToWrite);
  const socket = useContext(SocketContext);
  const messagesFromRedux = useSelector((store: RootState) => store.messages.allMessages);

  useEffect(() => {
    socket.on('viewedMessageToClient', async (data: ISocketViewed) => {
      dispatch(fetchLastUser({userId: data.to, userToFindId: data.from}));
      dispatch(changeIsViewed({id: data.messageId, isViewed: true}));
    });

    return ()=> {
      socket.removeListener('viewedMessageToClient');
    };
  }, [users]);

  useEffect(()=> {
    socket.on('messageToClient', async (data: ISocketNotification)=> {
      const messageFromServer = await apiConfig.getLastMesssage(data.from, data.to);
      await dispatch<any>(fetchUsers({login: activeUser.username})).payload;
      if (messageFromServer && (+messageFromServer.from === activeUser.userId || +messageFromServer.from === userToWrite.userId)) {
        dispatch(addMessage(messageFromServer));
      }
    });

    return ()=> {
      socket.removeListener('messageToClient');
    };
  }, [messagesFromRedux]);

  useEffect(()=> {
    (async ()=> {
      await dispatch(fetchMessages({userId: activeUser.userId, userToWriteId: userToWrite.userId}));
    })();
  }, [userToWrite.userId]);

  return (
    <div className='chat-messagesContainer'>
      <Virtuoso
        alignToBottom={true}
        followOutput={true}
        style={{display: 'flex', flexDirection: 'column'}}
        initialTopMostItemIndex={messagesFromRedux.length - 1}
        className='chat-messagesContainer'
        data={messagesFromRedux}
        itemContent={(index, message: Imessage) =>
          <div
            style={{display: 'flex', flexDirection: 'column'}}
          >
            <MessageItem
              id={message.id}
              isViewed={message.isViewed}
              time={message.time}
              from={message.from}
              message={message.message}
              type={message.type}
              key={index}
            />
          </div>}
      />
    </div>
  );
};

export default React.memo(Messages);

