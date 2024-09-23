import service from '@services/index';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';

const AuthService = {
  login: async (params: {username: string; password: string}) => {
    try {
      const res = await service.post(Config.LOGIN!, params);
      if (res.data?.status_code === 200) {
        service.defaults.headers.common.Authorization = `Bearer ${
          res?.data?.data?.auth_key || ''
        }`;
        await EncryptedStorage.setItem(
          'auth-access-token',
          res?.data?.data?.auth_key || '',
        );
        await EncryptedStorage.setItem(
          'user',
          JSON.stringify({
            email: res.data?.data?.email,
            name: res.data?.data?.full_name,
            username: res.data?.data?.username,
            mobile: res.data?.data?.mobile_no,
          }),
        );
      }
      return res?.data;
    } catch (error: any) {
      return error;
    }
  },
  register: async (params: {
    email: string;
    full_name: string;
    password: string;
    mobile_number: string;
  }) => {
    try {
      const res = await service.post(Config.SIGNUP!, params);
      if (res.data?.status_code === 200) {
        await EncryptedStorage.setItem(
          'auth-access-token',
          res?.data?.data?.auth_key || '',
        );
        await EncryptedStorage.setItem(
          'user',
          JSON.stringify({
            email: res.data?.data?.email,
            name: res.data?.data?.full_name,
            username: res.data?.data?.username,
            mobile: res.data?.data?.mobile_no,
          }),
        );
      }
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  getProfile: async () => {
    try {
      const res = await service.get(Config.PROFILE!);
      if (res?.data?.status_code === 200) {
        await EncryptedStorage.setItem('user', JSON.stringify(res?.data?.data));
        return res?.data;
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      return error;
    }
  },

  changePassword: async (params: {
    username: string;
    old_password: string;
    password: string;
    re_password: string;
  }) => {
    try {
      const res = await service.put(Config.CHANGE_PASSWORD!, params);
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  forgotPassword: async (params: {username: string}) => {
    try {
      const res = await service.put(Config.FORGOT_PASSWORD!, params);
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  forgotPasswordverifyOtp: async (params: {username: string; otp: string}) => {
    try {
      const res = await service.put(Config.FORGOT_PASSWORD_VERIFY_OTP!, params);
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  resetPassword: async (params: {
    username: string;
    token: string;
    password: string;
    re_password: string;
  }) => {
    try {
      const res = await service.put(Config.RESET_PASSWORD!, params);
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  logout: async () => {
    try {
      await service.post(Config.LOGOUT!);
      service.defaults.headers.common.Authorization = '';
      await EncryptedStorage.clear();
      return true;
    } catch (error) {
      await EncryptedStorage.clear();
      return error;
    }
  },
  deleteAccount: async (username: string) => {
    try {
      const res = await service.post(Config.DELETE_ACCOUNT!, {username});
      if (res?.data) {
        if (res?.data?.status_code === 200) {
          service.defaults.headers.common.Authorization = '';
          await EncryptedStorage.clear();
        }
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
};

export default AuthService;
