
import { createSlice } from '@reduxjs/toolkit';
import { RESET_ALL } from '../action'

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setLogout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    resetLoginState: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL, () => initialState);
  },
});

export const { setLogin, setLogout, resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;
