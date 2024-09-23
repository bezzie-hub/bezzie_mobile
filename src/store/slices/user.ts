import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AuthService from '@src/services/auth.service';
import showToast from '@src/utils/showToast';
import EncryptedStorage from 'react-native-encrypted-storage';
import {clearCart, getCart} from './cart';
import service from '@src/services';
import {setTheme, ThemeType} from './other';
import {RootState} from '..';

interface UserState {
  isAuthenticated: boolean;
  isAppInitialized: boolean;
  user: {
    full_name: string;
    mobile_no: string;
    email: string;
  } | null;
  error: string;
  loading: boolean;
  signupErrors: {
    email?: string;
    full_name?: string;
    password?: string;
    mobile_number?: string;
    mobile_no?: string;
  };
}

const initialState: UserState = {
  isAuthenticated: false,
  isAppInitialized: false,
  user: null,
  error: '',
  loading: false,
  signupErrors: {},
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    params: {
      username: string;
      password: string;
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const response: any = await AuthService.login(params);
      if (response?.status_code === 200) {
        dispatch(getCart({}));
        return response.data;
      } else {
        throw new Error(response?.message || '');
      }
    } catch (err: any) {
      showToast(err.message || 'Something went wrong');
      return rejectWithValue(err.message || 'Something went wrong');
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (
    params: {
      email: string;
      full_name: string;
      password: string;
      mobile_number: string;
    },
    {rejectWithValue},
  ) => {
    try {
      const response: any = await AuthService.register(params);
      if (response?.status_code === 200) {
        return response.data;
      } else if (response?.status_code === 403) {
        showToast(response?.message);
        return rejectWithValue({...response.data, isValidationError: true});
      } else {
        throw new Error(response?.message || '');
      }
    } catch (err: any) {
      showToast(err.message || 'Something went wrong');
      return rejectWithValue(err.message || 'Something went wrong');
    }
  },
);

export const checkAuthorization = createAsyncThunk(
  'user/checkAuthorization',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      const [theme, tmpAT, tmpUserStr] = await Promise.all([
        EncryptedStorage.getItem('theme'),
        EncryptedStorage.getItem('auth-access-token'),
        EncryptedStorage.getItem('user'),
      ]);
      if (theme) {
        dispatch(setTheme(theme as ThemeType));
      }
      if (tmpAT && tmpUserStr) {
        service.defaults.headers.common.Authorization = 'Bearer ' + tmpAT!;
        const response: any = await AuthService.getProfile();
        if (response?.status_code === 200) {
          dispatch(getCart({}));
          return response.data;
        } else {
          dispatch(logout());
          throw new Error(response?.message || '');
        }
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err: any) {
      return rejectWithValue(err.message || 'Something went wrong');
    }
  },
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      await AuthService.logout();
      dispatch(clearCart());
      showToast('You are logged out Successfully');
      return true;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Something went wrong');
    }
  },
);

export const deleteAccount = createAsyncThunk(
  'user/deleteAccount',
  async (_, {dispatch, getState}) => {
    try {
      const username = (getState() as RootState).user?.user?.email;
      const res = await AuthService.deleteAccount(username!);
      if (res?.status_code === 200) {
        dispatch(clearCart());
        showToast('Your account has been deleted');
        return true;
      } else {
        throw new Error(res?.message || '');
      }
    } catch (err: any) {
      showToast(err.message || 'Something went wrong');
      throw new Error(err.message || 'Something went wrong');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveCurrentUser(state, action: PayloadAction<any>) {
      state.isAuthenticated = true;
      state.isAppInitialized = true;
      state.user = action.payload.user;
      state.loading = false;
      state.error = '';
    },
    clearError(state) {
      state.error = '';
      state.signupErrors = {};
    },
    updateUserProfile(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(checkAuthorization.pending, state => {
      state.isAuthenticated = false;
      state.isAppInitialized = false;
    });
    builder.addCase(checkAuthorization.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAppInitialized = true;
    });
    builder.addCase(checkAuthorization.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isAppInitialized = true;
      state.error =
        (action.payload as string) || (action.error.message as string);
    });
    builder.addCase(login.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = {
        full_name: action.payload.full_name,
        mobile_no: action.payload.mobile_no,
        email: action.payload.email,
      };
      state.error = '';
      state.isAuthenticated = true;
      state.isAppInitialized = true;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = (action?.payload as string) || '';
      state.isAuthenticated = false;
      state.loading = false;
    });
    builder.addCase(logout.fulfilled, state => {
      state.isAuthenticated = false;
      state.isAppInitialized = true;
      state.user = null;
    });
    builder.addCase(logout.rejected, state => {
      state.error = 'something went wrong';
      state.isAppInitialized = true;
    });
    builder.addCase(deleteAccount.fulfilled, state => {
      state.isAuthenticated = false;
      state.isAppInitialized = true;
      state.user = null;
    });
    builder.addCase(deleteAccount.rejected, state => {
      state.error = 'something went wrong';
      state.isAppInitialized = true;
    });
    builder.addCase(signup.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = {
        full_name: action.payload.full_name,
        mobile_no: action.payload.mobile_no,
        email: action.payload.email,
      };
      state.error = '';
      state.signupErrors = {};
      state.isAuthenticated = true;
      state.isAppInitialized = true;
      state.loading = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      if (
        typeof action.payload === 'object' &&
        (action.payload as any)?.isValidationError
      ) {
        state.signupErrors = action.payload || {};
      } else {
        state.error = (action?.payload as string) || '';
      }
      state.isAuthenticated = false;
      state.loading = false;
    });
  },
});

export const {saveCurrentUser, clearError, updateUserProfile} =
  userSlice.actions;
export default userSlice.reducer;
