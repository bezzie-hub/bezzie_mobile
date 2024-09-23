import {useColorScheme} from 'react-native';
import {useAppSelector} from '@store/hooks';
import {RootState} from '@store/index';

const useGetTheme = () => {
  const scheme = useColorScheme();

  const {theme} = useAppSelector((state: RootState) => state.other);

  const isDark = () => {
    switch (theme) {
      case 'dark':
        return true;
      case 'light':
        return false;
      case 'system':
        return scheme === 'dark';
      default:
        return scheme === 'dark';
    }
  };

  return {
    isDark: isDark(),
    theme: theme === 'system' ? (scheme === 'dark' ? 'dark' : 'light') : theme,
  };
};

export default useGetTheme;
