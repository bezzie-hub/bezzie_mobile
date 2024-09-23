import service from '@services/index';
import Config from 'react-native-config';

const SettingsService = {
  getSettings: async () => {
    try {
      const res: any = await service.get(Config.GET_SETTINGS!);
      return res?.data;
    } catch (error) {
      return error;
    }
  },
};

export default SettingsService;
