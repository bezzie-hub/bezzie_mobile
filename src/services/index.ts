import axios from 'axios';
import Config from 'react-native-config';

const service = axios.create({
  baseURL: `${Config.API_BASE_URL}${Config.ERP_VERSION}${Config.API_VERSION}`,
  timeout: 60000,
  headers: {
    common: {
      Accept: 'application/json',
      'App-Type': 'app',
    },
  },
});

service.interceptors.request.use(
  async (config: any) => {
    config.url = `${Config.API_BASE_URL}${Config.ERP_VERSION}${Config.API_VERSION}${config.url}`;
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    if (
      (error?.response?.status === 403 &&
        error?.response?.data?.exc_type === 'PermissionError') ||
      (error?.response?.status === 401 &&
        error?.response?.data?.exc_type === 'AuthenticationError')
    ) {
      return Promise.reject({
        ...error.response,
        message: 'Unauthorized. Please login to continue.',
      });
    } else {
      return Promise.reject(error);
    }
  },
);

export default service;
