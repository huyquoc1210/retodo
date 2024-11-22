import type { AlertProps } from '@mui/material/Alert';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Message {
  message: string;
  type?: AlertProps['severity'];
}

interface State {
  message: Message | null;
}

const initialState: State = {
  message: null,
};

const nofiticationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<Message | null>) {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = nofiticationSlice.actions;
export default nofiticationSlice.reducer;
