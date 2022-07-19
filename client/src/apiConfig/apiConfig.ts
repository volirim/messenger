import axios from 'axios';
import { Imessage } from '../components/MessageItem';
import { IStoreUser } from '../store/slices/users';
import { authURLs, IAuth } from '../types/auth';
import { ISendMessage, ISetViewed } from '../types/messages';

const URL = 'http://localhost:4000/';

const tokenConst = () => {
  return ({headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  });
};
interface Response {
  data: IStoreUser[];
}

const apiConfig = {
  registerPOST: async (data: IAuth) => {
    return await axios.post(URL + authURLs.AUTH_REGISTER, data);
  },

  loginPost: async (data: IAuth) => {
    return await axios.post(URL + authURLs.AUTH_LOGIN, data);
  },

  usersGet: async (login: string, nickname = ''): Promise<Response> => {
    return await axios.post(`${URL}app/users`, {username: login, nickname}, tokenConst());
  },

  checkJwt: async (): Promise<boolean> => {
    return await axios.get(`${URL}app/checkauth`, tokenConst());
  },

  getUserStatus: async (id: number): Promise<any> => {
    return (await axios.get(`${URL}app/getStatus?id=${id}`)).data;
  },

  getUserToWrite: async (id: number): Promise<any> => {
    try {
      return (await axios.get(`${URL}app/findUser?id=${id}`)).data;
    } catch (e) {
      return null;
    }
  },

  getSelectedUser: async (userId: number, userToSelectId: number): Promise<IStoreUser> => {
    return (await axios.get(`${URL}app/selectOne?id=${userId}&userToFindId=${userToSelectId}`)).data;
  },

  sendMessage: async (data: ISendMessage): Promise<any> => {
    return (await axios.post(`${URL}message/send`, data)).data;
  },

  sendFile: async (data: ISendMessage): Promise<any> => {
    return (await axios.post(`${URL}message/sendImage`, data)).data;
  },

  setViewed: async (data: ISetViewed): Promise<any> => {
    return (await axios.post(`${URL}message/viewed`, data)).data;
  },

  getLastMesssage: async (from: string, to: string): Promise<any> => {
    try {
      return (await axios.get(`${URL}message/last?from=${from}&to=${to}`)).data;
    } catch (e) {
      console.log('lastmessageError1');
    }
  },

  getAllMesssages: async (from: number, to: number): Promise<Imessage[] | null> => {
    try {
      return (await axios.get(`${URL}message/getMessages?from=${from}&to=${to}`)).data;
    } catch (e) {
      return null;
    }
  },
};

export default apiConfig;
