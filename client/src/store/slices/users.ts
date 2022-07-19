import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiConfig from '../../apiConfig/apiConfig';
import { IactiveUser } from './activeUser';

export interface userToWrite extends IactiveUser {
  room: string
}
export interface IStoreUser extends IactiveUser {
  lastMessage: any;
}

export interface Iusers {
  userToWrite: userToWrite,
  users: IStoreUser[]
}

interface IFetchUsers {
  login: string;
  nicknameToFind?: string;
}

interface IFetchLast {
  userId: number;
  userToFindId: number;
}

const initialState: Iusers = {
  userToWrite: {
    userId: 0,
    username: '',
    room: '',
  },
  users: [],
};

export const fetchUsers = createAsyncThunk(
  'users/getAll',
  async ({login, nicknameToFind}: IFetchUsers): Promise<IStoreUser[]> => {
    return (await apiConfig.usersGet(login, nicknameToFind)).data;
  }
);

export const fetchLastUser = createAsyncThunk(
  'users/getLast',
  async ({userId, userToFindId}: IFetchLast): Promise<IStoreUser> => {
    return (await apiConfig.getSelectedUser(userId, userToFindId));
  }
);

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserToWrite: (state) => {
      return {...state, userToWrite: {...initialState.userToWrite}};
    },
    setUserToWrite: (state, action: PayloadAction<userToWrite>) => {
      return {...state, userToWrite: action.payload};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(fetchLastUser.fulfilled, (state, action) => {
      const newArray = state.users.map((user) => {
        if (user.userId === +action.payload.lastMessage.from || user.userId === +action.payload.lastMessage.to) {
          user.lastMessage = action.payload.lastMessage;
          return user;
        }
        return user;
      });
      state.users = newArray;
    });
  },
});

export const { setUserToWrite, clearUserToWrite } = users.actions;

export default users.reducer;
