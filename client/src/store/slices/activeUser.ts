import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IactiveUser {
    userId: number;
    username: string;
}

const initialState: IactiveUser = {
  userId: 0,
  username: 'unauthorized',
};

export const activeUser = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    clearActiveUser: () => {
      return initialState;
    },
    setActiveUser: (state, action: PayloadAction<IactiveUser>) => {
      return {...action.payload};
    },
  },
});

export const { setActiveUser, clearActiveUser } = activeUser.actions;

export default activeUser.reducer;
