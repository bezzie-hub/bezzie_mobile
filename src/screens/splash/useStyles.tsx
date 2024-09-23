import {StyleSheet} from 'react-native';

import useScale from '@utils/useScale';

const useStyles = () => {
  const {ms} = useScale();

  return StyleSheet.create({
    imgBg: {
      height: '100%',
      width: '100%',
      flex: 1,
    },
    safeView: {
      height: '100%',
      width: '100%',
      flex: 1,
      flexDirection: 'column-reverse',
    },
    loaderContainer: {
      height: ms(50),
      marginBottom: ms(50),
    },
  });
};

export default useStyles;
