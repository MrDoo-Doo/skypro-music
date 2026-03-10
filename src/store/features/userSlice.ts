import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialUserReturns = {
  email: string;
  username: string;
  _id: number;
  access: string;
  refresh: string;
};

const initialState: initialUserReturns = {
  email: 'email',
  username: 'Anonim',
  _id: 0,
  access: '',
  refresh: '',
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
      localStorage.setItem('userName', action.payload);
    },
    setIdUser: (state, action: PayloadAction<number>) => {
      state._id = action.payload;
    },
    setTokenAccess: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
      localStorage.setItem('tokenAccess', action.payload);
    },
    setTokenRefresh: (state, action: PayloadAction<string>) => {
      state.refresh = action.payload;
      localStorage.setItem('tokenRefresh', action.payload);
    },
    clearUserData: (state) => {
      state.username = '';
      state.access = '';
      state.refresh = '';
      localStorage.removeItem('userName');
      localStorage.removeItem('tokenAccess');
      localStorage.removeItem('tokenRefresh');
    },
  },
});

export const {
  setEmailUser,
  setNameUser,
  setIdUser,
  setTokenAccess,
  setTokenRefresh,
  clearUserData,
} = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
