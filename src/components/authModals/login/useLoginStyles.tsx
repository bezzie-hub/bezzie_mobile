import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

import useScale from '@utils/useScale';
import Values from '@config/values';

function useLoginStyles() {
  const {ms} = useScale();
  const {colors} = useTheme();

  return StyleSheet.create({
    container: {
      width: '100%',
    },
    head: {
      fontSize: ms(Values.XL),
      fontFamily: 'Montserrat-Bold',
      marginBottom: ms(2 * Values.CONTAINER_MARGIN),
      color: colors.text,
      textAlign: 'center',
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    btnContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.success,
    },
    btnStyle: {
      borderRadius: ms(Values.BORDER_RADIUS),
      height: ms(Values.BUTTON_HEIGHT),
      minWidth: ms(100),
    },
    btnTitle: {
      paddingHorizontal: ms(Values.TEXT_PADDING * 4),
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
    },
    signUp: {
      width: '100%',
      alignItems: 'center',
      marginTop: ms(2 * Values.CONTAINER_MARGIN),
    },
    signupText: {
      fontSize: ms(Values.M),
      color: colors.text,
      fontFamily: 'Montserrat-Regular',
    },
    forgotText: {
      fontSize: ms(Values.M),
      color: colors.text,
      fontFamily: 'Montserrat-Regular',
    },
    signUpTextBtn: {
      color: colors.secondary,
    },
    input: {
      fontSize: ms(Values.M),
      color: colors.text,
      fontFamily: 'Montserrat-Regular',
      width: '100%',
    },
    passwordInput: {},
  });
}

export default useLoginStyles;
