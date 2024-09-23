import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import useCommonStyles from '@config/useCommonStyles';

import Values from '@config/values';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {ms} = useScale();
  const {colors} = useTheme();
  const commonStyles = useCommonStyles();

  return StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: colors.background,
    },
    contentContainer: {
      ...commonStyles.scrollContent,
      paddingBottom: ms(100),
    },
    input: {
      fontSize: ms(Values.M),
      color: colors.text,
      fontFamily: 'Montserrat-Regular',
      width: '100%',
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'center',
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
      width: '100%',
    },
    btnTitle: {
      paddingHorizontal: ms(Values.TEXT_PADDING * 4),
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
    },
  });
};

export default useStyles;
