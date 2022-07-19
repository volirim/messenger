import './styles.css';
import ChatWindowHeader from '../ChatWindowHeader';
import InputArea from '../InputArea';
import Messages from '../Messages';
import React from 'react';
import { focusMessageInputFunc, sendMessageFunc } from '../../utils/inputAreaFunctions';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import PinButton from '../PinButton/PinButton';

const ChatMessageZone = () => {
  return (
    <div className='messageZone'>
      <ChatWindowHeader />
      <Messages/>
      <InputArea submitFunc={sendMessageFunc} needToReset={true} type={'string'} icon={faPaperPlane} focusFunc={focusMessageInputFunc} pinButton={<PinButton />} />
    </div>
  );
};

export default ChatMessageZone;
