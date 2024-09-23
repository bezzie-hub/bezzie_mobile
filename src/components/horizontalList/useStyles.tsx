import {useTheme} from '@react-navigation/native';
import {DimensionValue, StyleSheet, useWindowDimensions} from 'react-native';

import Values from '@config/values';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const {ms} = useScale();

  return StyleSheet.create({
    listContainer: {
      marginTop: ms(Values.CONTAINER_MARGIN),
      width: '100%',
      alignSelf: 'center',
    },
    listTitleContainer: {
      flexDirection: 'row',
      marginBottom: ms(Values.TEXT_MARGIN),
      justifyContent: 'space-between',
      width: Values.CONTAINER_WIDTH as DimensionValue,
      alignSelf: 'center',
    },
    listTitle: {
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Bold',
      color: colors.text,
    },
    viewAll: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Regular',
      textDecorationLine: 'underline',
      color: colors.text,
    },
    listContentContainer: {
      paddingVertical: ms(Values.CONTAINER_PADDING),
      alignItems: 'center',
      paddingRight: ms(Values.CONTAINER_PADDING),
    },

    listItem: {
      marginHorizontal: ms(Values.CONTAINER_MARGIN),
      flexDirection: 'column',
      overflow: 'hidden',
      borderRadius: ms(Values.BORDER_RADIUS),
      paddingBottom: ms(Values.CONTAINER_PADDING),
      width: width * 0.4,
      maxWidth: ms(150),
      height: ms(200),
    },
    itemImg: {
      borderRadius: ms(Values.BORDER_RADIUS),
      height: width * 0.4,
      width: width * 0.4,
      maxWidth: ms(150),
      maxHeight: ms(150),
      overflow: 'hidden',
    },
    content: {
      flex: 1,
      marginHorizontal: ms(Values.TEXT_MARGIN),
    },
    itemTitle: {
      fontSize: ms(Values.S),
      fontFamily: 'Montserrat-SemiBold',
      width: '95%',
      paddingTop: ms(Values.TEXT_PADDING),
      paddingBottom: ms(Values.INNER_TEXT_PADDING),
      color: colors.text,
    },
    price: {
      fontSize: ms(Values.S),
      fontFamily: 'Montserrat-SemiBold',
      color: colors.secondaryShade,
    },
  });
};

export default useStyles;
