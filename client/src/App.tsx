import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './components/Login';
import { loginFunc, registerFunc } from './utils/auth';
import { LOGIN_MODAL, REGISTER_MODAL } from './constants/authConstants';
import { socket, SocketContext } from './context/socketContext';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from './themes/defaultTheme';

function App () {
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <Routes>
          <Route path='/' element={
            <SocketContext.Provider value={socket}>
              <Chat />
            </SocketContext.Provider>
          } />
          <Route path='/login' element={<Login title='Login' submitForm={loginFunc} navigateButton={LOGIN_MODAL} />} />
          <Route path='/register' element={<Login title='Register' submitForm={registerFunc} navigateButton={REGISTER_MODAL} />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
