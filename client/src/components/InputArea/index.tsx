import './styles.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { KeyboardEventHandler, useContext } from 'react';
import React from 'react';
import { Button, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SocketContext } from '../../context/socketContext';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
interface IInputArea {
  // eslint-disable-next-line no-unused-vars
  submitFunc: (inputValue: string, type: string, socket?: Socket<DefaultEventsMap, DefaultEventsMap>) => Promise<null | undefined | void>;
  // eslint-disable-next-line no-unused-vars
  focusFunc?: (isTyping: boolean, socket: Socket<DefaultEventsMap, DefaultEventsMap>) => void;
  needToReset: boolean;
  icon: IconDefinition;
  // eslint-disable-next-line no-undef
  pinButton?: JSX.Element;
  type: string,
}

const InputArea = ({submitFunc, needToReset, icon, focusFunc, pinButton, type}: IInputArea) => {
  const { register, handleSubmit, reset} = useForm<{message: string}>();
  const socket = useContext(SocketContext);

  const onSubmit: SubmitHandler<{message: string}> = async (data) => {
    submitFunc(data.message, type, socket);
    if (needToReset) {
      reset();
    }
  };

  const onEnter: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      onSubmit({message: (event.target as HTMLTextAreaElement).value});
    }
  };

  const onBlurFunc = () => {
    return focusFunc ? focusFunc(false, socket) : undefined;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='chat-inputArea'>
      <TextField
        onFocus={()=> focusFunc ? focusFunc(true, socket) : undefined}
        variant='standard'
        className='chat-input'
        {...register('message', {onBlur: onBlurFunc})}
        onKeyDown={onEnter}
        multiline
        maxRows={4}
        placeholder='write your message...'
        InputProps={{
          disableUnderline: true,
        }}
      />
      { pinButton ? pinButton : null }
      <Button variant="contained" className='chat-button' type='submit' size='small'><FontAwesomeIcon icon={icon}/></Button>
    </form>
  );
};

export default InputArea;
