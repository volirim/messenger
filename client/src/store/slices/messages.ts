import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiConfig from '../../apiConfig/apiConfig';
import { Imessage } from '../../components/MessageItem';

interface thunkInterface {
    userId: number;
    userToWriteId: number;
}

interface IInitialState {
    allMessages: Imessage[];
}

interface IViewed {
    id: number;
    isViewed: boolean;
}

export const fetchMessages = createAsyncThunk(
  'messages/getAll',
  async ({userId, userToWriteId}: thunkInterface): Promise<Imessage[]> => {
    const messages = await apiConfig.getAllMesssages(userId, userToWriteId);
    if (messages) {
      return [...messages];
    }
    return [];
  }
);

const initialState: IInitialState = {
  allMessages: [],
};

export const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Imessage>) => {
      return {...state, allMessages: [...state.allMessages, action.payload] } ;
    },
    changeIsViewed: (state, action: PayloadAction<IViewed>) => {
      const newState = state.allMessages.map((message) => {
        if (message.id === action.payload.id) {
          return { ...message, isViewed: action.payload.isViewed};
        }
        return message;
      });
      return {...state, allMessages: newState } ;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.allMessages = action.payload;
    });
  },
});

export const { addMessage, changeIsViewed } = messages.actions;

export default messages.reducer;
