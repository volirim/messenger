/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Imessage } from '../MessageItem';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToWrite } from '../../store/slices/users';
import { RootState } from '../../store/store';
import './styles.css';
import  getClientDate  from '../../utils/dateParser';
import { messageCutter } from '../../utils/messageUtils';
import CheckViewed from '../CheckViewed';

interface IUserCard {
    id: number;
    username: string;
    message: Imessage | null;
}

const UserCard = ({username, id, message}: IUserCard) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const userToWrite = useSelector((store:RootState) => store.users.userToWrite);

  const date = message ? getClientDate(message.time) : null;

  useEffect(()=> {
    if (userToWrite.userId === id) {
      setIsActive(true);
    }
    else {
      setIsActive(false);
    }
  }, [userToWrite.userId]);

  const handleUserClick = async () => {
    dispatch(setUserToWrite({username, userId: id, room: '2'}));
  };

  return (
    <ListItem disablePadding key={id} className='mainUser-container'>
      <ListItemButton onClick={handleUserClick} selected={isActive}>
        <ListItemIcon>
          <Avatar>{username.slice(0, 2)}</Avatar>
        </ListItemIcon>
        <div className='user-messageArea'>
          <ListItemText primary={username} className='userInner-nickname'/>
          <ListItemText primary={message ? (message.type === 'string' ? messageCutter(message) : 'image') : 'write your first message)'} className='userInner-lastMessage' />
        </div>
        <div className='user-timeCheckArea'>
          <ListItemText primary={date ? `${date.hours}:${date.minutes}` : ''} className='userInner-messageTime' />
          {message ? <CheckViewed isViewed={message.isViewed}/> : <></>}
        </div>
      </ListItemButton>
    </ListItem>
  );
};

export default React.memo(UserCard);
