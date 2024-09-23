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
  const {width, height} = useWindowDimensions();
  const orientation = useGetOrientation();

  return StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: colors.background,
    },
    contentContainer: {
      paddingBottom: ms(orientation === 'LANDSCAPE' ? 0 : 80),
    },
    innerContainer: {
      paddingBottom: ms(
        Values.CONTAINER_PADDING * (orientation === 'LANDSCAPE' ? 0 : 3),
      ),
    },
    topContainer: {
      flexDirection: orientation === 'LANDSCAPE' ? 'row' : 'column',
    },
    pTop: {
      flexDirection: orientation === 'LANDSCAPE' ? 'row-reverse' : 'row',
      justifyContent:
        orientation === 'LANDSCAPE' ? 'flex-end' : 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      flex: 1,
    },
    pTopLeft: {
      width:
        orientation === 'LANDSCAPE' ? (3 * height * 0.75) / 4 : width * 0.75,
      alignItems: 'center',
    },
    cImg: {
      width:
        orientation === 'LANDSCAPE'
          ? (3 * height * 0.75) / 4
          : width > 600
          ? width * 0.6
          : width * 0.75,
      height:
        orientation === 'LANDSCAPE'
          ? height * 0.75
          : ((width > 600 ? width * 0.6 : width * 0.75) * 4) / 3,
      borderTopRightRadius: ms(Values.BORDER_RADIUS),
      borderBottomRightRadius: ms(Values.BORDER_RADIUS),
      borderTopLeftRadius:
        orientation === 'LANDSCAPE' || width > 600
          ? ms(Values.BORDER_RADIUS)
          : 0,
      borderBottomLeftRadius:
        orientation === 'LANDSCAPE' || width > 600
          ? ms(Values.BORDER_RADIUS)
          : 0,
      overflow: 'hidden',
    },
    pTopRight: {
      borderTopWidth: ms(1),
      borderLeftWidth: orientation === 'LANDSCAPE' ? 0 : ms(1),
      borderRightWidth: orientation === 'LANDSCAPE' ? ms(1) : 0,
      borderBottomWidth: ms(1),
      width: orientation === 'LANDSCAPE' ? height * 0.2 : width * 0.2,
      borderTopLeftRadius:
        orientation === 'LANDSCAPE' ? 0 : ms(Values.BORDER_RADIUS),
      borderBottomLeftRadius:
        orientation === 'LANDSCAPE' ? 0 : ms(Values.BORDER_RADIUS),
      borderTopRightRadius:
        orientation === 'LANDSCAPE' || width > 600
          ? ms(Values.BORDER_RADIUS)
          : 0,
      borderBottomRightRadius:
        orientation === 'LANDSCAPE' || width > 600
          ? ms(Values.BORDER_RADIUS)
          : 0,
      borderColor: colors.border,
      paddingVertical: ms(Values.CONTAINER_PADDING),
      backgroundColor: colors.background,
      overflow: 'hidden',
      height:
        orientation === 'LANDSCAPE'
          ? height * 0.75
          : ((width > 600 ? width * 0.6 : width * 0.75) * 4) / 3,
      marginRight:
        orientation === 'LANDSCAPE' ? ms(2 * Values.CONTAINER_MARGIN) : 0,
    },
    pTopRightScroll: {
      width: orientation === 'LANDSCAPE' ? height * 0.2 : width * 0.2,
    },
    pTopRightScrollContent: {
      width: '100%',
      alignItems: 'center',
    },
    pTopRightView: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    pagFlatlist: {
      height: orientation === 'LANDSCAPE' ? height * 0.5 : width * 0.6,
      marginBottom: ms(Values.CONTAINER_MARGIN),
    },
    pTopRightContent: {
      paddingHorizontal:
        orientation === 'LANDSCAPE'
          ? (height * 0.092) / 2
          : (width * 0.092) / 2,
      paddingBottom: ms(Values.CONTAINER_PADDING),
    },
    pImg: {
      width: orientation === 'LANDSCAPE' ? height * 0.108 : width * 0.108,
      height: orientation === 'LANDSCAPE' ? height * 0.108 : width * 0.108,
      marginVertical: ms(Values.TEXT_MARGIN),
      borderRadius: ms(Values.BORDER_RADIUS),
      overflow: 'hidden',
    },
    activeImg: {
      borderWidth: ms(1),
      borderColor: colors.secondary,
    },
    iconContainer: {
      borderRadius: ms(Values.BORDER_RADIUS),
      backgroundColor: colors.primary,
      width: orientation === 'LANDSCAPE' ? height * 0.108 : width * 0.108,
      height: orientation === 'LANDSCAPE' ? height * 0.108 : width * 0.108,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: ms(Values.TEXT_MARGIN),
      borderWidth: ms(1),
      borderColor: colors.secondary,
    },
    rightAddBtns: {
      borderTopWidth: ms(1),
      borderTopColor: colors.border,
      paddingTop: ms(Values.TEXT_PADDING),
    },
    pDetailContainer: {
      marginHorizontal:
        orientation === 'LANDSCAPE'
          ? ms(2 * Values.CONTAINER_MARGIN)
          : ms(Values.CONTAINER_MARGIN),
      marginTop: orientation === 'LANDSCAPE' ? 0 : ms(Values.CONTAINER_MARGIN),
      padding: ms(Values.CONTAINER_PADDING),
      paddingLeft: ms(
        orientation === 'LANDSCAPE'
          ? Values.CONTAINER_PADDING * 2
          : Values.CONTAINER_PADDING,
      ),
      flex: 1,
    },
    pCategory: {
      color: colors.text,
      fontSize: ms(Values.XL),
      fontFamily: 'Montserrat-Medium',
      marginBottom: ms(Values.TEXT_MARGIN),
      textDecorationLine: 'underline',
      width: '100%',
    },
    pTitle: {
      color: colors.pageHead,
      fontSize: ms(Values.PAGE_HEAD),
      fontFamily: 'Montserrat-Bold',
      marginBottom: ms(Values.TEXT_MARGIN),
      width: '100%',
    },
    pPrice: {
      color: colors.secondary,
      fontSize: ms(Values.XXL),
      fontFamily: 'Montserrat-Bold',
    },
    mrpPrice: {
      color: colors.text,
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Medium',
      marginLeft: ms(Values.CONTAINER_MARGIN),
      textDecorationLine: 'line-through',
    },
    offerPercent: {
      color: colors.secondary,
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Bold',
      marginLeft: ms(Values.CONTAINER_MARGIN),
    },
    pDesc: {
      color: colors.text,
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Regular',
      marginBottom: ms(Values.TEXT_MARGIN),
    },
    sizes: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: ms(Values.TEXT_MARGIN),
    },
    sizeItem: {
      borderWidth: ms(1),
      borderColor: colors.text,
      borderRadius: ms(Values.BORDER_RADIUS),
      padding: ms(Values.TEXT_PADDING),
      minWidth: ms(40),
      height: ms(32),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: ms(Values.CONTAINER_MARGIN),
      marginBottom: ms(Values.CONTAINER_MARGIN),
    },
    selectedSize: {
      borderColor: colors.secondaryShade,
    },
    sizeItemText: {
      color: colors.text,
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Regular',
    },
    selectedSizeText: {
      color: colors.secondaryShade,
    },
    linearGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: ms(70),
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
      justifyContent: 'center',
      paddingTop: ms(Values.TEXT_PADDING),
    },
    addToCartBtn: {
      height: ms(Values.BUTTON_HEIGHT),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.secondary,
      paddingHorizontal: ms(2 * Values.CONTAINER_PADDING),
      borderRadius: ms(Values.BORDER_RADIUS),
      width: ms(200),
      maxWidth: width * 0.5,
      flexDirection: 'row',
      zIndex: 10,
    },
    nInput: {
      borderColor: colors.secondaryShade,
      backgroundColor: colors.secondaryShade,
      fontSize: ms(Values.XL),
      fontFamily: 'Montserrat-SemiBold',
    },
    addToCartBtnText: {
      marginLeft: ms(Values.CONTAINER_MARGIN),
      color: colors.white,
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-SemiBold',
    },
    lAddToCartContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
      paddingTop: ms(Values.TEXT_PADDING),
      marginTop: ms(Values.CONTAINER_MARGIN),
    },
    mLeft: {
      marginLeft: ms(2 * Values.CONTAINER_MARGIN),
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginBottom: ms(Values.TEXT_MARGIN),
    },
    outOfStock: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: ms(Values.CONTAINER_MARGIN),
    },
    outOfStockText: {
      color: colors.danger,
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Bold',
      marginLeft: ms(Values.TEXT_MARGIN),
    },
  });
};

export default useStyles;
