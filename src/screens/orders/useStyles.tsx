import {useTheme} from '@react-navigation/native';
import {StyleSheet, useWindowDimensions} from 'react-native';

import Values from '@config/values';
import useGetOrientation from '@utils/useGetOrientation';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {ms} = useScale();
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const orientation = useGetOrientation();

  return StyleSheet.create({
    priceAmount: {
      fontFamily: 'Montserrat-Bold',
    },
    priceItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: ms(Values.TEXT_MARGIN),
    },
    order: {
      width: '100%',
      overflow: 'hidden',
      alignSelf: 'center',
      paddingVertical: ms(Values.CONTAINER_PADDING),
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
      marginBottom: ms(5),
      borderRadius: ms(Values.BORDER_RADIUS),
      backgroundColor: colors.card,
    },
    orderTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: ms(Values.CONTAINER_MARGIN),
    },
    orderNumber: {
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Bold',
      alignSelf: 'center',
      color: colors.contentText,
    },
    viewDetailText: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-SemiBold',
      alignSelf: 'center',
      color: colors.secondary,
      textDecorationLine: 'underline',
    },
    orderItems: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    item: {
      flexDirection: 'row',
      borderRadius: ms(Values.BORDER_RADIUS),
      marginBottom: ms(Values.CONTAINER_MARGIN),
      width: orientation === 'LANDSCAPE' ? '49%' : '100%',
      alignSelf: 'center',
      overflow: 'hidden',
      height: orientation === 'LANDSCAPE' ? width * 0.125 : width * 0.2,
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
    itemTitle: {
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
  });
};

export default useStyles;
