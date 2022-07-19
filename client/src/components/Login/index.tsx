import './styles.css';
import { useForm } from 'react-hook-form';
import { IAuth } from '../../types/auth';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import React from 'react';
import { Button, Paper, TextField } from '@mui/material';
import { SocketContext } from '../../context/socketContext';
import { AuthInterface } from '../../utils/auth';
interface Auth {
    title: string;
    // eslint-disable-next-line no-unused-vars
    submitForm: (data: IAuth) => Promise<AuthInterface | false>;
    navigateButton: {
        title: string;
        to: string;
    }
}

const Login = ({ title, submitForm, navigateButton }: Auth) => {
  const { handleSubmit, register, reset } = useForm<IAuth>();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  useEffect(()=> {
    localStorage.setItem('token', '');
    socket.close();
  }, []);

  const onSubmit = async (data: IAuth) => {
    socket.open();
    const credentials = await submitForm(data);

    if (credentials) {
      socket.emit('joinPrivateRoom', credentials.sub.toString());
      reset();
      navigate('/');
    }
  };

  const handleRedirect = () => {
    navigate(navigateButton.to);
  };

  return (
    <div className='login-container'>
      <Paper className='login-form'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{title}</h2>
          <div className='login-inputsContainer'>
            <TextField
              label="Login"
              variant="standard"
              {...register('username', {
                required: true,
                maxLength: 20,
              })}
              color="primary"
              className='login-input'
            />
            <TextField
              label="Password"
              variant="standard"
              type={'password'}
              {...register('password', {
                required: true,
                maxLength: 25,
              })}
              color="primary"
              className='login-input'
            />
          </div>
          <Button variant="contained" type='submit' className='form-button' style={{width: '30%', alignSelf: 'center'}}>submit</Button>
          <Button variant='outlined' onClick={handleRedirect} className='form-button'>{navigateButton.title}</Button>
        </form>
      </Paper>
    </div>

  );
};

export default Login;
