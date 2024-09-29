import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

import Values from '@config/values';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {colors} = useTheme();
  const {ms} = useScale();

  return StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      width: '100%',
      backgroundColor: colors.background,
    },
    contentContainer: {
      paddingBottom: ms(50),
      width: '95%',
      alignSelf: 'center',
      backgroundColor: colors.background,
    },
    first: {
      paddingTop: ms(50),
    },
    btnContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingBottom: ms(Values.CONTAINER_PADDING),
      paddingTop: ms(Values.CONTAINER_PADDING / 5),
      marginHorizontal: ms(Values.CONTAINER_MARGIN),
      overflow: 'hidden',
      backgroundColor: colors.background,
      gap: ms(Values.CONTAINER_MARGIN),
    },
    btn: {
      flex: 1,
    },
    clearBtn: {
      borderRadius: ms(Values.BORDER_RADIUS),
      height: ms(Values.BUTTON_HEIGHT),
      borderWidth: ms(1),
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.contentText,
    },
    applyBtn: {
      borderRadius: ms(Values.BORDER_RADIUS),
      height: ms(Values.BUTTON_HEIGHT),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.success,
    },
    closeBtnContainer: {
      position: 'absolute',
      top: ms(15),
      right: 0,
      padding: 0,
      zIndex: 1000,
    },
    btnText: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Regular',
    },
    clearBtnText: {
      color: colors.contentText,
    },
    applyBtnText: {
      color: colors.white,
    },
  });
};

export default useStyles;
