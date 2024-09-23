import {useTheme} from '@react-navigation/native';
import {StyleSheet, useWindowDimensions} from 'react-native';

import Values from '@config/values';
import useGetOrientation from '@utils/useGetOrientation';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const {ms} = useScale();
  const orientation = useGetOrientation();

  const columns = parseInt((width / 200).toFixed(0), 10);

  return StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors.background,
    },
    list: {
      width: '100%',
      marginTop: ms(Values.CONTAINER_MARGIN),
      alignSelf: 'center',
    },
    listContainer: {
      paddingBottom: ms(Values.CONTAINER_PADDING * 5),
      alignSelf: 'center',
    },
    itemTitle: {
      fontSize: ms(Values.S),
      fontFamily: 'Montserrat-Bold',
      paddingBottom: ms(Values.INNER_TEXT_MARGIN),
      alignSelf: 'flex-start',
      color: colors.contentText,
    },
    price: {
      fontSize: ms(Values.S),
      fontFamily: 'Montserrat-Bold',
    },
    iconContainer: {
      position: 'absolute',
      top: ms(5),
      right: '5%',
      zIndex: ms(10),
      padding: ms(Values.TEXT_PADDING),
      borderRadius: ms(Values.BORDER_RADIUS),
      backgroundColor: colors.shade,
    },
    item: {
      borderRadius: ms(Values.BORDER_RADIUS),
      alignItems: 'center',
      width: width / columns - 20,
      marginVertical:
        orientation === 'LANDSCAPE' || width > 600
          ? ms(Values.CONTAINER_MARGIN * 2)
          : ms(Values.CONTAINER_MARGIN),
      marginHorizontal: ms(Values.CONTAINER_MARGIN / 2),
    },
    imgStyle: {
      borderTopLeftRadius: ms(Values.BORDER_RADIUS),
      borderTopRightRadius: ms(Values.BORDER_RADIUS),
    },
    image: {
      width: width / columns - 20,
      height: width / columns - 20,
    },
    itemDetail: {
      alignSelf: 'center',
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
      paddingBottom: ms(Values.CONTAINER_PADDING),
      borderBottomLeftRadius: ms(Values.BORDER_RADIUS),
      borderBottomRightRadius: ms(Values.BORDER_RADIUS),
      width: width / columns - 20,
      backgroundColor: colors.card,
    },
    rating: {
      marginBottom: ms(Values.INNER_TEXT_MARGIN),
      alignSelf: 'flex-start',
    },
    filter: {
      marginVertical: ms(Values.CONTAINER_MARGIN),
    },
    filterContainer: {
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      paddingHorizontal: ms(Values.CONTAINER_MARGIN),
    },
    filterItem: {
      borderRadius: ms(Values.BORDER_RADIUS),
      marginHorizontal: ms(Values.TEXT_MARGIN),
      height: ms(30),
      backgroundColor: colors.secondary,
    },
    filterName: {
      fontFamily: 'Montserrat-Bold',
      fontSize: ms(Values.S),
      paddingHorizontal: ms(15),
      textAlignVertical: 'center',
      height: '100%',
      color: colors.white,
    },
    listFooter: {
      marginVertical: ms(2 * Values.CONTAINER_MARGIN),
    },
    emptyContainer: {
      width: '60%',
      alignItems: 'center',
      paddingVertical: ms(50),
    },
    emptyText: {
      fontSize: ms(Values.L),
      color: colors.text,
      fontFamily: 'Montserrat-Regular',
      textAlign: 'center',
    },
  });
};

export default useStyles;
