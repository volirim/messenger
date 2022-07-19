import './styles.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, IStoreUser } from '../../store/slices/users';
import { AppDispatch, RootState } from '../../store/store';
import UserCard from '../UserCard';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { List } from '@mui/material';

const UsersTable = () => {
  const activeUserLogin = useSelector((store: RootState) => store.activeUser.username);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const users = useSelector((store: RootState) => store.users.users);

  useEffect(()=> {
    (async () => {
      try {
        await dispatch<any>(fetchUsers({login: activeUserLogin})).payload;
      } catch (e) {
        navigate('/login');
      }
    })();
  }, [activeUserLogin]);

  return (
    <List className='usersTable-container'>
      {users.map((user: IStoreUser) => <UserCard username={user.username} id={user.userId} key={user.userId} message={user.lastMessage} />)}
    </List>
  );
};

export default React.memo(UsersTable);
