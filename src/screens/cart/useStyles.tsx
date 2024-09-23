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
    title: {
      paddingBottom: 0,
    },
    innerContainer: {
      backgroundColor: colors.background,
    },
    headText: {
      color: colors.pageHead,
    },
    imgStyle: {
      borderRadius: ms(Values.BORDER_RADIUS),
      height: orientation === 'LANDSCAPE' ? width * 0.125 : width * 0.25,
      width: orientation === 'LANDSCAPE' ? width * 0.125 : width * 0.25,
    },
    priceText: {
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Regular',
      color: colors.text,
    },
    priceAmount: {
      fontFamily: 'Montserrat-Bold',
    },
    priceItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: ms(Values.TEXT_MARGIN),
    },
    swipeContainerStyle: {
      width: '100%',
      marginBottom: ms(Values.CONTAINER_MARGIN),
      height: orientation === 'LANDSCAPE' ? width * 0.125 : width * 0.25,
    },
    animItem: {
      width: orientation === 'LANDSCAPE' ? '50%' : '100%',
      height: orientation === 'LANDSCAPE' ? width * 0.125 : width * 0.25,
      paddingHorizontal: ms(Values.CONTAINER_MARGIN),
      marginTop: ms(Values.CONTAINER_MARGIN),
    },
    item: {
      flexDirection: 'row',
      borderRadius: ms(Values.BORDER_RADIUS),
      width: '100%',
      alignSelf: 'center',
      overflow: 'hidden',
      height: orientation === 'LANDSCAPE' ? width * 0.125 : width * 0.25,
      backgroundColor: colors.card,
    },
    itemRight: {
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
      paddingTop: ms(Values.TEXT_PADDING),
      overflow: 'hidden',
      paddingBottom: ms(Values.TEXT_PADDING),
      justifyContent: 'space-between',
      flex: 1,
    },
    itemTitle: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Bold',
      color: colors.contentText,
      marginRight: ms(Values.CONTAINER_PADDING),
    },
    subTitle: {
      fontSize: ms(Values.S),
      fontFamily: 'Montserrat-Regular',
      color: colors.contentText,
      marginRight: ms(Values.CONTAINER_PADDING),
    },
    tileBottom: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: ms(Values.TEXT_MARGIN),
    },
    price: {
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Bold',
      color: colors.secondary,
    },
    bw0: {
      borderWidth: 0,
    },
    priceDetailContainer: {
      marginTop: 30,
      width: '100%',
      alignSelf: 'center',
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
    },
    dash: {
      width: '100%',
      height: 1,
      marginVertical: ms(Values.CONTAINER_MARGIN),
      borderBottomWidth: ms(1),
      borderColor: colors.grey,
      borderStyle: 'dashed',
    },
    bold: {fontWeight: 'bold'},
    btnContainer: {
      alignSelf: 'center',
      marginTop: ms(Values.CONTAINER_MARGIN * 2),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.success,
    },
    btnTitle: {
      paddingHorizontal: ms(Values.TEXT_PADDING * 4),
      fontSize: ms(Values.XL),
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
    },
    btnStyle: {
      borderRadius: ms(Values.BORDER_RADIUS),
      height: ms(Values.BUTTON_HEIGHT),
    },
    emptyContainer: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: ms(50),
    },
    emptyText: {
      fontSize: ms(Values.L),
      color: colors.text,
      fontFamily: 'Montserrat-Regular',
    },
    error: {
      marginVertical: ms(2),
      fontFamily: 'Montserrat-Medium',
      fontSize: ms(Values.XS),
      lineHeight: ms(Values.XS + 2),
      color: colors.danger,
      marginHorizontal: ms(Values.CONTAINER_MARGIN),
    },
  });
};

export default useStyles;
