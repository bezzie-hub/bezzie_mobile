import {StyleSheet} from 'react-native';

import Values from '@config/values';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {ms} = useScale();

  return StyleSheet.create({
    numericInput: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: ms(1),
      overflow: 'hidden',
    },
    leftBtn: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightBtn: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInput: {
      height: '100%',
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Regular',
      paddingHorizontal: ms(1),
      paddingVertical: 0,
      textAlign: 'center',
    },
  });
};

export default useStyles;
