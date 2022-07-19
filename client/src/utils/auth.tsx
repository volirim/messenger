import apiConfig from '../apiConfig/apiConfig';
import { setActiveUser } from '../store/slices/activeUser';
import { store } from '../store/store';
import { IAuth } from '../types/auth';

export interface AuthInterface {
  sub: number,
  username: string,
  access_token: string,
}

const initialState = {
  sub: 0,
  username: 'unauthorized',
  access_token: '',
};

const setUser = (data: typeof initialState) => {
  const {username, sub} = data;
  store.dispatch(setActiveUser({username, userId: sub}));
  localStorage.setItem('token', data.access_token);
};

export const loginFunc = async (data: IAuth): Promise<AuthInterface | false> => {
  try {
    const userData = (await apiConfig.loginPost(data)).data;
    setUser(userData);
    return userData;
  } catch (e) {
    setUser(initialState);
    return false;
  }
};

export const registerFunc = async (data: IAuth): Promise<AuthInterface | false> => {
  try {
    const userData = (await apiConfig.registerPOST(data)).data;
    if (userData) {
      setUser(userData);
      return userData;
    }
    return false;
  } catch (e) {
    setUser(initialState);
    return false;
  }
};
