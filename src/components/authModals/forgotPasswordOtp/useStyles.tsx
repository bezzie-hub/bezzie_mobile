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
    gobackText: {
      fontSize: ms(Values.M),
      color: colors.text,
      fontFamily: 'Montserrat-Regular',
    },
    input: {
      fontSize: ms(Values.M),
      color: colors.text,
      fontFamily: 'Montserrat-Regular',
      width: '100%',
    },
    otp: {width: '100%', height: ms(60), borderWidth: 0},
    otpItem: {
      height: ms(Values.INPUT_HEIGHT),
      width: ms(Values.INPUT_HEIGHT),
      borderRadius: ms(Values.BORDER_RADIUS),
      fontSize: ms(Values.L),
      borderWidth: ms(0.5),
      backgroundColor: colors.background,
      borderColor: colors.border,
      color: colors.text,
    },
    errorText: {
      marginTop: ms(2),
      fontFamily: 'Montserrat-Medium',
      fontSize: ms(Values.XS),
      lineHeight: ms(Values.XS + 2),
      color: colors.danger,
    },
    errContainer: {
      marginBottom: ms(20),
    },
  });
}

export default useLoginStyles;
