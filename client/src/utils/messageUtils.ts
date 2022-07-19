import { FieldValues } from 'react-hook-form';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Imessage } from '../components/MessageItem';
import { IactiveUser } from '../store/slices/activeUser';
import { userToWrite } from '../store/slices/users';

export const generateDateId = () => (new Date()).getTime().toString();

export const sendMessage = (socket: Socket<DefaultEventsMap, DefaultEventsMap>, activeUser: IactiveUser, userToWrite: userToWrite, data: FieldValues, room?: string) => {
  return (socket.emit('msgToServer', {
    from: activeUser.username,
    to: userToWrite.username,
    message: data.message,
    room,
  }));
};

export const messageCutter = (message: Imessage) => {
  return message.message.length >= 34 ? message.message.slice(0, 34).padEnd(37, '.') : message.message;
};
