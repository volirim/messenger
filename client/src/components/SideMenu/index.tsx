/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { clearActiveUser } from '../../store/slices/activeUser';
import { clearUserToWrite } from '../../store/slices/users';

import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Exit from '@mui/icons-material/ExitToApp';
import User from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const userData = useSelector((store: RootState) => store.activeUser);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSettings = () => {
    setOpen(!open);
  };

  const handleExitButtonClick = () => {
    dispatch(clearActiveUser());
    dispatch(clearUserToWrite());
    localStorage.setItem('token', '');
    navigate('/login');
  };

  const handleProfileButtonClick = () => {
    dispatch(clearUserToWrite());
    setOpen(false);
  };

  return (
    <List>
      <ListItemButton onClick={handleSettings} style={open ? {backgroundColor: 'white' } : {}}>
        <ListItemText primary={userData.username}/>
        {<Settings />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleProfileButtonClick}>
            <ListItemIcon>
              <User />
            </ListItemIcon>
            <ListItemText primary="profile" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleExitButtonClick}>
            <ListItemIcon>
              <Exit />
            </ListItemIcon>
            <ListItemText primary="exit" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default SideMenu;
