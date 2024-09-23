import {useTheme} from '@react-navigation/native';
import {DimensionValue, StyleSheet, useWindowDimensions} from 'react-native';
import useCommonStyles from '@config/useCommonStyles';

import Values from '@config/values';
import useGetOrientation from '@utils/useGetOrientation';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {ms} = useScale();
  const {colors} = useTheme();
  const commonStyles = useCommonStyles();
  const orientation = useGetOrientation();
  const {width} = useWindowDimensions();

  return StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: colors.background,
    },
    headText: {
      ...commonStyles.headText,
      color: colors.pageHead,
    },
    innerContainer: {
      ...commonStyles.innerContainer,
      backgroundColor: colors.background,
    },
    swipeContainerStyle: {
      width: '100%',
      marginBottom: ms(Values.CONTAINER_MARGIN),
      height: ms(125),
    },
    animItem: {
      width: '100%',
      height: ms(125),
      marginBottom: ms(Values.CONTAINER_MARGIN),
    },
    sectionHead: {
      fontSize: ms(Values.XL),
      fontFamily: 'Montserrat-Bold',
      paddingBottom: ms(Values.TEXT_PADDING),
      color: colors.text,
    },
    right: {width: '15%', justifyContent: 'center'},
    iconBtn: {
      justifyContent: 'center',
      marginRight: ms(Values.CONTAINER_MARGIN),
      borderRadius: ms(15),
      height: ms(30),
      width: ms(30),
      alignItems: 'center',
    },
    addAddress: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Bold',
      marginTop: ms(Values.INNER_TEXT_MARGIN),
      textDecorationLine: 'underline',
      color: colors.success,
    },
    addAddressBtn: {
      alignSelf: 'flex-end',
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
    item: {
      flexDirection: 'row',
      borderRadius: ms(Values.BORDER_RADIUS),
      marginBottom: ms(Values.CONTAINER_MARGIN),
      width: '100%',
      alignSelf: 'center',
      overflow: 'hidden',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      paddingLeft: ms(Values.TEXT_PADDING),
      backgroundColor: colors.card,
    },
    itemLeft: {
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
      overflow: 'hidden',
      flex: 5,
      paddingRight: ms(2 * Values.CONTAINER_PADDING),
    },
    itemTitle: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Bold',
      lineHeight: ms(18),
      color: colors.contentText,
    },
    itemDesc: {
      fontSize: ms(Values.S),
      fontFamily: 'Montserrat-Regular',
      lineHeight: ms(18),
      color: colors.contentText,
    },
    tileBottom: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginVertical: ms(Values.TEXT_MARGIN),
    },
    mt5: {marginTop: ms(Values.TEXT_MARGIN)},
    justifyCenter: {justifyContent: 'center'},
    paymentItem: {
      justifyContent: 'center',
      flexDirection: 'column',
      alignContent: 'flex-start',
      alignItems: 'flex-start',
    },
    paymentTitle: {
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Bold',
      color: colors.contentText,
    },
    addressNotSelected: {
      fontFamily: 'Montserrat-Regular',
      textAlign: 'center',
    },
    addressText: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Regular',
      color: colors.contentText,
    },
    paymentAmountContainer: {
      flexDirection: 'row',
      paddingVertical: ms(Values.TEXT_PADDING),
    },
    paymentAmount: {
      fontSize: ms(Values.XL),
      fontFamily: 'Montserrat-Bold',
      marginLeft: ms(Values.CONTAINER_MARGIN),
      color: colors.secondary,
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
      marginTop: ms(Values.CONTAINER_MARGIN * 3),
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
    modalContainer: {
      flex: 1,
      backgroundColor: colors.overlay,
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    modalHead: {
      marginBottom: ms(Values.CONTAINER_MARGIN),
    },
    modalListHead: {
      backgroundColor: colors.background,
    },
    modalContent: {
      backgroundColor: colors.background,
      width: Values.CONTAINER_WIDTH as DimensionValue,
      alignSelf: 'center',
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
      paddingVertical: ms(20),
      borderRadius: ms(Values.BORDER_RADIUS),
      maxWidth: ms(400),
      maxHeight: '95%',
      overflow: 'hidden',
      minHeight: ms(200),
    },
    addressSafeView: {
      height: '100%',
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    closeBtn: {
      position: 'absolute',
      top: ms(5),
      right: ms(5),
      height: ms(30),
      width: ms(30),
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    rowSpacBtw: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    changeText: {
      fontFamily: 'Montserrat-Medium',
      color: colors.secondary,
      textDecorationLine: 'underline',
      fontSize: ms(Values.M),
    },
    emptyContainer: {
      minHeight: width * 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyCartContainer: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: ms(50),
    },
    emptyText: {
      fontSize: ms(Values.L),
      color: colors.text,
      fontFamily: 'Montserrat-Regular',
    },
    addressOverlay: {
      flex: 1,
      zIndex: 100,
      backgroundColor: colors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    selections: {
      flexWrap: 'wrap',
      flexDirection: orientation === 'LANDSCAPE' ? 'row' : 'column',
      gap: ms(Values.CONTAINER_MARGIN),
      width: '100%',
    },
    w100: {
      width: '100%',
      flex: 1,
    },
    lottie: {
      height: ms(200),
      width: ms(200),
      position: 'relative',
      top: ms(-50),
      marginBottom: ms(-95),
    },
    confirmText: {
      color: colors.contentText,
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Bold',
      maxWidth: ms(250),
      textAlign: 'center',
    },
    modalBtnContainer: {
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
