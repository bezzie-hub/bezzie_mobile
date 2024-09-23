import {useTheme} from '@react-navigation/native';
import {DimensionValue, StyleSheet, useWindowDimensions} from 'react-native';
import useGetOrientation from '../utils/useGetOrientation';

import useScale from '../utils/useScale';
import Values from './values';
const useCommonStyles = (isInnerPage: boolean = false) => {
  const {ms} = useScale();
  const {colors} = useTheme();
  const {height} = useWindowDimensions();
  const orientation = useGetOrientation();
  return StyleSheet.create({
    shadow: {
      shadowColor: Values.SHADOW_COLOR,
      shadowOffset: {
        height: ms(Values.SHADOW_OFFSET.height),
        width: ms(Values.SHADOW_OFFSET.width),
      },
      shadowOpacity: ms(Values.SHADOW_OPACITY),
      shadowRadius: ms(Values.SHADOW_RADIUS),
      elevation: ms(Values.ELEVATION),
    },
    container: {
      flex: 1,
      height: '100%',
      width: '100%',
    },
    headText: {
      fontSize: ms(Values.PAGE_HEAD),
      fontFamily: 'Montserrat-Bold',
      width: Values.CONTAINER_WIDTH as DimensionValue,
      alignSelf: 'center',
      paddingVertical: ms(Values.HEAD_PADDING),
      color: colors.pageHead,
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
    },
    innerContainer: {
      overflow: 'hidden',
      minHeight: '100%',
    },
    scrollContainer: {
      flex: 1,
      height: '100%',
      width: '100%',
    },
    scrollContent: {
      width: Values.CONTAINER_WIDTH as DimensionValue,
      alignSelf: 'center',
      paddingBottom: isInnerPage
        ? ms(Values.CONTAINER_PADDING * 2)
        : orientation === 'LANDSCAPE'
        ? height * 0.4
        : height * 0.2,
      paddingTop: ms(Values.CONTAINER_PADDING),
    },
  });
};

export default useCommonStyles;
