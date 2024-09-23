import {useTheme} from '@react-navigation/native';
import {DimensionValue, StyleSheet} from 'react-native';

import Values from '@config/values';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {ms} = useScale();
  const {colors} = useTheme();

  return StyleSheet.create({
    confirmContentContainer: {
      alignItems: 'center',
    },
    confirmText: {
      color: colors.contentText,
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Regular',
      paddingTop: ms(Values.CONTAINER_PADDING),
    },
    btnContainer: {
      marginTop: ms(2 * Values.CONTAINER_MARGIN),
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingBottom: ms(Values.CONTAINER_PADDING),
      paddingTop: ms(Values.CONTAINER_PADDING / 5),
      width: Values.CONTAINER_WIDTH as DimensionValue,
      overflow: 'hidden',
      backgroundColor: colors.background,
      gap: ms(Values.CONTAINER_MARGIN),
    },
    btn: {
      flex: 1,
      height: ms(32),
    },
    cancelBtn: {
      borderRadius: ms(Values.BORDER_RADIUS),
      borderWidth: ms(1),
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.contentText,
    },
    confirmBtn: {
      borderRadius: ms(Values.BORDER_RADIUS),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.success,
    },
    btnText: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Regular',
    },
    cancelBtnText: {
      color: colors.contentText,
    },
    confirmBtnText: {
      color: colors.white,
    },
  });
};

export default useStyles;
