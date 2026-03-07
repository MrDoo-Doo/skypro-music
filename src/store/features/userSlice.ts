import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialUserReturns = {
  email: string;
  username: string;
  _id: number;
};

const initialState: initialUserReturns = {
  email: 'email',
  username: 'Anonim',
  _id: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmailUser: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setNameUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setIdUser: (state, action: PayloadAction<number>) => {
      state._id = action.payload;
    },
  },
});

export const { setEmailUser, setNameUser, setIdUser } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
