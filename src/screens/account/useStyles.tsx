import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import useCommonStyles from '@config/useCommonStyles';

import Values from '@config/values';
import useGetOrientation from '@utils/useGetOrientation';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {ms} = useScale();
  const {colors} = useTheme();
  const commonStyles = useCommonStyles();
  const orientation = useGetOrientation();

  return StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: colors.background,
    },
    contentContainer: {
      paddingBottom: ms(100),
    },
    innerContainer: {
      backgroundColor: colors.background,
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
      flexWrap: 'wrap',
      flexDirection: orientation === 'LANDSCAPE' ? 'row' : 'column',
    },
    animItem: {
      width: orientation === 'LANDSCAPE' ? '50%' : '100%',
    },
    animLeft: {
      paddingRight:
        orientation === 'LANDSCAPE' ? ms(Values.CONTAINER_PADDING) : 0,
    },
    animRight: {
      paddingLeft:
        orientation === 'LANDSCAPE' ? ms(Values.CONTAINER_PADDING) : 0,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: ms(Values.CONTAINER_PADDING),
      paddingRight: ms(Values.CONTAINER_PADDING),
      marginBottom: ms(Values.TEXT_MARGIN),
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftIcon: {
      marginRight: ms(20),
      backgroundColor: colors.card,
      padding: ms(Values.TEXT_PADDING),
      borderRadius: ms(Values.BORDER_RADIUS),
    },
    itemText: {
      color: colors.contentText,
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Medium',
    },
    rightIcon: {},
    accountIcon: {
      marginRight: ms(20),
      backgroundColor: colors.card,
      padding: ms(Values.TEXT_PADDING),
      borderRadius: ms(Values.BORDER_RADIUS),
      width: ms(40 + 2 * Values.TEXT_PADDING),
    },
    accountCard: {
      paddingBottom: ms(Values.CONTAINER_MARGIN),
      flexDirection: 'row',
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
    },
    fullName: {
      color: colors.contentText,
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Bold',
    },
    email: {
      color: colors.contentText,
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Regular',
      paddingTop: ms(2),
    },
  });
};

export default useStyles;
