import {StyleSheet} from 'react-native';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {ms} = useScale();
  return StyleSheet.create({
    loaderContainer: {
      flex: 1,
      height: '100%',
      width: '100%',
      justifyContent: 'center',
    },
    loader: {width: ms(100), height: ms(100), alignSelf: 'center'},
  });
};

export default useStyles;
