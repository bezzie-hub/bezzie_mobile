import {useTheme} from '@react-navigation/native';
import {StyleSheet, useWindowDimensions} from 'react-native';
import useCommonStyles from '@config/useCommonStyles';

import Values from '@config/values';
import useGetOrientation from '@utils/useGetOrientation';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {ms} = useScale();
  const {colors} = useTheme();
  const commonStyles = useCommonStyles();
  const {width} = useWindowDimensions();
  const orientation = useGetOrientation();

  return StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: colors.background,
    },
    innerContainer: {
      backgroundColor: colors.background,
    },
    headText: {
      color: colors.pageHead,
    },
    listContainer: {},
    animItem: {
      width:
        width > 1200
          ? (width - ms(110)) / 7
          : orientation === 'LANDSCAPE' || width > 600
          ? (width - ms(90)) / 5
          : (width - ms(50)) / 3,
      height:
        width > 1200
          ? (width - ms(110)) / 7
          : orientation === 'LANDSCAPE' || width > 600
          ? (width - ms(90)) / 5
          : (width - ms(50)) / 3,
      marginBottom: ms(Values.CONTAINER_MARGIN),
      borderRadius: ms(Values.BORDER_RADIUS),
      overflow: 'hidden',
    },
    image: {
      width:
        width > 1200
          ? (width - ms(110)) / 7
          : orientation === 'LANDSCAPE' || width > 600
          ? (width - ms(90)) / 5
          : (width - ms(50)) / 3,
      height:
        width > 1200
          ? (width - ms(110)) / 7
          : orientation === 'LANDSCAPE' || width > 600
          ? (width - ms(90)) / 5
          : (width - ms(50)) / 3,
    },
    mh10: {
      marginHorizontal: ms(Values.CONTAINER_MARGIN),
    },
    mh5: {
      marginHorizontal: ms(Values.CONTAINER_MARGIN) / 2,
    },
    linearGradient: {
      position: 'absolute',
      bottom: ms(1),
      left: ms(1),
      right: ms(1),
      height: ms(40),
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: ms(Values.CONTAINER_PADDING / 2),
      justifyContent: 'center',
      paddingTop: ms(Values.TEXT_PADDING),
      overflow: 'hidden',
      borderRadius: ms(5),
    },
    categoryTextContainer: {
      height: ms(40),
      width: '100%',
      paddingBottom: ms(5),
      justifyContent: 'center',
    },
    categoryText: {
      fontSize: ms(Values.L),
      textAlign: 'center',
      color: colors.pageHead,
    },
  });
};

export default useStyles;
