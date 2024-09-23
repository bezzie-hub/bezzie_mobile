import {useTheme} from '@react-navigation/native';
import {DimensionValue, StyleSheet, useWindowDimensions} from 'react-native';

import Values from '@config/values';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {colors} = useTheme();
  const {width, height} = useWindowDimensions();
  const {ms, isLandscape} = useScale();

  const featuredContentCount = Math.floor(width / ms(250));

  const featuredContenItemtWidth =
    (width / featuredContentCount - 3 * ms(Values.CONTAINER_MARGIN)) * 0.5;

  const featuredItemHeight =
    ((width / featuredContentCount - 3 * ms(Values.CONTAINER_MARGIN)) *
      0.5 *
      4) /
    3;

  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      width: '100%',
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: height * (isLandscape ? 0.2 : 0.1),
      backgroundColor: colors.background,
    },
    listTitle: {
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Bold',
      color: colors.text,
    },
    listTitleContainer: {
      flexDirection: 'row',
      marginBottom: ms(Values.TEXT_MARGIN),
      justifyContent: 'space-between',
      width: Values.CONTAINER_WIDTH as DimensionValue,
      alignSelf: 'center',
    },
    listContainer: {
      marginTop: ms(Values.CONTAINER_MARGIN),
      width: '100%',
      alignSelf: 'center',
    },
    content: {
      flex: 1,
      marginHorizontal: ms(Values.TEXT_MARGIN),
    },
    featuredItemsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: ms(Values.CONTAINER_PADDING),
    },
    featuredListItem: {
      flex: 1,
      flexDirection: 'row',
      marginHorizontal: ms(Values.CONTAINER_MARGIN),
      justifyContent: 'space-between',
    },
    featuredItemImgContainer: {
      width: featuredContenItemtWidth,
      height: featuredItemHeight,
      borderRadius: ms(Values.BORDER_RADIUS),
    },
    featuredItemImg: {
      height: '100%',
      width: '100%',
      borderRadius: ms(Values.BORDER_RADIUS),
      overflow: 'hidden',
    },
    featuredContent: {
      flex: 1,
      marginHorizontal: ms(Values.CONTAINER_MARGIN),
      justifyContent: 'space-between',
    },
    featuredAddToCartBtn: {
      backgroundColor: colors.primary,
      height: ms(32),
      borderRadius: ms(Values.BORDER_RADIUS),
      marginBottom: ms(Values.INNER_TEXT_MARGIN),
      justifyContent: 'center',
      alignItems: 'center',
    },
    disabledBtn: {
      backgroundColor: colors.lightPrimary,
    },
    addToCartText: {
      color: colors.white,
      fontSize: ms(Values.M),
    },
    featuredItemTitle: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Bold',
      width: '95%',
      paddingTop: ms(Values.TEXT_PADDING),
      paddingBottom: ms(Values.INNER_TEXT_PADDING),
      color: colors.text,
    },
    featuredItemPrice: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-SemiBold',
      color: colors.secondaryShade,
    },
    featuredItemCategory: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-SemiBold',
      color: colors.text,
      marginVertical: ms(Values.TEXT_MARGIN),
    },
    newItemsContainer: {
      flexDirection: 'row',
      paddingVertical: ms(Values.CONTAINER_PADDING),
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
      height: ms(215) + 2 * ms(Values.CONTAINER_PADDING),
      marginBottom: ms(Values.CONTAINER_MARGIN),
    },
    newContentContainer: {
      paddingRight: ms(30),
    },
    newLeftImg: {
      width: ms(215),
      height: ms(215),
      borderRadius: ms(Values.BORDER_RADIUS),
      overflow: 'hidden',
      marginRight: ms(7.5),
    },
    newRight: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
    rightTop: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    rightTopImg: {
      width: ms(120),
      height: ms(120),
      marginHorizontal: ms(7.5),
      borderRadius: ms(Values.BORDER_RADIUS),
    },
    rightBottom: {
      flexDirection: 'row',
    },
    rightBottomImg: {
      width: ms(80),
      height: ms(80),
      marginHorizontal: ms(7.5),
      borderRadius: ms(Values.BORDER_RADIUS),
    },
    newListForwardBtn: {
      flex: 1,
      height: ms(80),
      backgroundColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: ms(Values.BORDER_RADIUS),
      marginHorizontal: ms(7.5),
    },
    viewAll: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Regular',
      textDecorationLine: 'underline',
      color: colors.text,
    },
  });
};

export default useStyles;
