import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import Values from '@config/values';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {ms} = useScale();
  const {colors} = useTheme();

  return StyleSheet.create({
    input: {
      marginBottom: ms(2 * Values.CONTAINER_MARGIN),
    },
    inputItem: {
      borderWidth: ms(1),
      borderRadius: ms(Values.BORDER_RADIUS),
      borderColor: colors.border,
    },
    label: {
      marginBottom: ms(8),
      fontFamily: 'Montserrat-Medium',
      fontSize: ms(Values.M),
      lineHeight: ms(Values.M + 4),
      position: 'absolute',
      zIndex: 10,
      paddingHorizontal: ms(6),
      letterSpacing: 0.33,
      top: ms(-10),
      left: ms(11),
    },
    inputContainer: {
      height: ms(Values.BUTTON_HEIGHT),
      paddingHorizontal: ms(11),
      flexDirection: 'row',
      overflow: 'hidden',
    },
    errorText: {
      marginTop: ms(2),
      fontFamily: 'Montserrat-Medium',
      fontSize: ms(Values.XS),
      lineHeight: ms(Values.XS + 2),
      color: colors.danger,
    },
    req: {color: colors.danger},
  });
};

export default useStyles;
