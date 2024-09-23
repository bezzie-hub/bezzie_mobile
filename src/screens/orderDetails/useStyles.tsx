import {useTheme} from '@react-navigation/native';
import {DimensionValue, StyleSheet, useWindowDimensions} from 'react-native';

import Values from '@config/values';
import useGetOrientation from '@utils/useGetOrientation';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {ms} = useScale();
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const orientation = useGetOrientation();

  return StyleSheet.create({
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
    priceDetailContainer: {
      width: '100%',
      alignSelf: 'center',
      marginTop: ms(70),
    },
    noStatus: {
      marginTop: ms(Values.CONTAINER_MARGIN),
    },
    dash: {
      width: '100%',
      height: 1,
      marginVertical: ms(Values.CONTAINER_MARGIN),
      borderBottomWidth: ms(1),
      borderColor: colors.grey,
      borderStyle: 'dashed',
    },
    itemTitle: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Regular',
      lineHeight: ms(22),
      color: colors.contentText,
    },
    listContainer: {
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
      width: Values.CONTAINER_WIDTH as DimensionValue,
      alignSelf: 'center',
      paddingBottom: ms(Values.CONTAINER_PADDING * 2),
      paddingTop: ms(Values.CONTAINER_PADDING),
    },
    listItem: {
      padding: ms(Values.CONTAINER_PADDING),
      marginRight: ms(Values.CONTAINER_MARGIN * 2),
      borderRadius: ms(Values.BORDER_RADIUS),
      backgroundColor: colors.card,
    },
    listImg: {
      borderRadius: ms(Values.BORDER_RADIUS),
      minHeight: ms(100),
      aspectRatio: 1,
      width: orientation === 'LANDSCAPE' ? width / 7 : width / 3.5,
      height: orientation === 'LANDSCAPE' ? width / 7 : width / 3.5,
    },
    topSection: {
      flexDirection: 'row',
    },
    details: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: ms(Values.CONTAINER_MARGIN),
      paddingHorizontal:
        orientation === 'LANDSCAPE' ? ms(Values.CONTAINER_PADDING / 2) : 0,
    },
    orderDetailsTile: {
      flex: 1,
      height: '100%',
      marginTop: ms(Values.CONTAINER_MARGIN / 2),
      paddingVertical: ms(Values.CONTAINER_PADDING),
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
      borderRadius: ms(Values.BORDER_RADIUS),
      width: orientation === 'LANDSCAPE' ? '49%' : '100%',
      backgroundColor: colors.card,
    },
    orderedProductsTitle: {
      width: '100%',
      marginBottom: ms(Values.CONTAINER_MARGIN),
    },
    orderText: {
      fontSize: ms(Values.XL),
      fontFamily: 'Montserrat-Bold',
      width: '100%',
      alignSelf: 'center',
      color: colors.contentText,
    },
    orderedProductsText: {
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Bold',
      width: '100%',
      alignSelf: 'center',
      color: colors.contentText,
    },
    orderStatusContainer: {
      top: ms(40),
      position: 'absolute',
      alignSelf: 'center',
      overflow: 'hidden',
      flexDirection: 'row',
      height: ms(80),
      width: orientation === 'LANDSCAPE' ? width * 0.35 : width * 0.7,
    },
    stageIconView: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      height: ms(40),
      width: ms(40),
      justifyContent: 'center',
      borderRadius: ms(Values.BORDER_RADIUS),
      zIndex: 1,
      alignItems: 'center',
    },
    stageLineView: {
      marginTop: ms(Values.CONTAINER_MARGIN * 2),
      height: ms(5),
    },
    firstLine: {
      width: orientation === 'LANDSCAPE' ? width * 0.175 : width * 0.35,
    },
    secondIcon: {
      left:
        (orientation === 'LANDSCAPE' ? width * 0.175 : width * 0.35) - ms(20),
    },
    left0: {
      left: 0,
    },
    stageRight: {
      overflow: 'hidden',
      width:
        (orientation === 'LANDSCAPE' ? width * 0.175 : width * 0.35) - ms(5),
    },
    thirdIcon: {
      left: (orientation === 'LANDSCAPE' ? width * 0.35 : width * 0.7) - ms(40),
    },
    priceDash: {
      width: '100%',
      height: ms(1),
      marginVertical: ms(Values.CONTAINER_MARGIN),
    },
    bold: {fontWeight: 'bold'},
    addressContainer: {
      marginTop: ms(Values.CONTAINER_MARGIN),
      width: '100%',
      alignSelf: 'center',
    },
    loaderContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemWrapper: {
      paddingHorizontal: ms(Values.CONTAINER_PADDING / 2),
      width: orientation === 'LANDSCAPE' ? '50%' : '100%',
    },
    item: {
      flexDirection: 'row',
      borderRadius: ms(Values.BORDER_RADIUS),
      marginBottom: ms(Values.CONTAINER_MARGIN),
      height: orientation === 'LANDSCAPE' ? width * 0.125 : width * 0.2,
      alignSelf: 'center',
      overflow: 'hidden',
      backgroundColor: colors.card,
    },
    itemImg: {
      borderRadius: ms(Values.BORDER_RADIUS),
      height: orientation === 'LANDSCAPE' ? width * 0.125 : width * 0.2,
      width: orientation === 'LANDSCAPE' ? width * 0.125 : width * 0.2,
    },
    itemCount: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Bold',
      color: colors.contentText,
    },
    itemLeft: {
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
      paddingTop: ms(Values.CONTAINER_PADDING),
      overflow: 'hidden',
      flex: 5,
      paddingBottom: ms(Values.TEXT_PADDING),
      justifyContent: 'space-between',
    },
    productTitle: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Bold',
      color: colors.contentText,
    },
    tileBottom: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginVertical: ms(Values.TEXT_MARGIN),
    },
    price: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Bold',
      color: colors.secondary,
    },
  });
};

export default useStyles;
