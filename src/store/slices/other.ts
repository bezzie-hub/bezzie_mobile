import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ThemeType = 'dark' | 'light' | 'system';
export type AuthModalType =
  | 'none'
  | 'login'
  | 'signup'
  | 'forgotPassword'
  | 'resetPassword'
  | 'forgot-otp';

interface OtherState {
  theme: ThemeType;
  authModalStatus: AuthModalType;
  hasNetwork: boolean;
}

const initialState: OtherState = {
  theme: 'system',
  authModalStatus: 'none',
  hasNetwork: false,
};

const otherSlice = createSlice({
  name: 'other',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeType>) {
      state.theme = action.payload;
    },
    setAuthModalStatus(state, action: PayloadAction<AuthModalType>) {
      state.authModalStatus = action.payload;
    },
    setNetworkConnection(state, action: PayloadAction<boolean>) {
      state.hasNetwork = action.payload;
    },
  },
});

export const {setTheme, setAuthModalStatus, setNetworkConnection} =
  otherSlice.actions;
export default otherSlice.reducer;
