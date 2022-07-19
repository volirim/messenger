import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import apiConfig from '../apiConfig/apiConfig';
import { fetchUsers } from '../store/slices/users';
import { store } from '../store/store';

type TImage = {id: number, image: string}

export const sendMessageFunc = async (inputValue: string | TImage, type: string, socket?: Socket<DefaultEventsMap, DefaultEventsMap>) => {
  const userToWriteId = store.getState().users.userToWrite.userId;
  const activeUserId = store.getState().activeUser.userId;
  if (typeof inputValue === 'string') {
    if (userToWriteId !== activeUserId && inputValue.length !== 0) {
      try {
        await apiConfig.sendMessage({from: activeUserId, to: userToWriteId, type, message: inputValue, isViewed: false});
        if (socket) {
          socket.emit('messageToServer', {to: userToWriteId.toString(), from: activeUserId.toString()});
        }
      } catch (e) {
        return null;
      }
    }
  }
};

export const sendFilesFunc = async (inputValue: Array<TImage>, type: string, socket?: Socket<DefaultEventsMap, DefaultEventsMap>) => {
  const userToWriteId = store.getState().users.userToWrite.userId;
  const activeUserId = store.getState().activeUser.userId;
  if (userToWriteId !== activeUserId && inputValue.length !== 0) {
    try {
      inputValue.map(async (image) => {
        await apiConfig.sendFile({from: activeUserId, to: userToWriteId, type, message: image.image, isViewed: false});
        if (socket) {
          socket.emit('messageToServer', {to: userToWriteId.toString(), from: activeUserId.toString()});
        }
      });
    } catch (e) {
      return null;
    }
  }
};

export const findUsersByNickname = async (inputValue: string) => {
  const activeUserLogin = store.getState().activeUser.username;
  store.dispatch(fetchUsers({login: activeUserLogin, nicknameToFind: inputValue}));
};

export const focusMessageInputFunc = (isTyping: boolean, socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
  const userToWriteId = store.getState().users.userToWrite.userId;
  const activeUserId = store.getState().activeUser.userId;
  socket.emit('isTypingToServer', {to: userToWriteId.toString(), from: activeUserId.toString(), isTyping});

};
