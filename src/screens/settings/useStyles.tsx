import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

import Values from '@config/values';
import useGetOrientation from '@utils/useGetOrientation';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {ms} = useScale();
  const {colors} = useTheme();
  const orientation = useGetOrientation();

  return StyleSheet.create({
    items: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: ms(Values.CONTAINER_MARGIN),
      flex: 1,
      width: '100%',
    },
    card: {
      padding: ms(Values.CONTAINER_PADDING),
      borderRadius: ms(Values.BORDER_RADIUS),
      paddingBottom: ms(Values.CONTAINER_PADDING),
      backgroundColor: colors.card,
      width: '100%',
    },
    radioContainer: {
      flexDirection: 'row',
      marginVertical: ms(Values.CONTAINER_MARGIN),
    },
    radioItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    radio: {
      height: ms(20),
      width: ms(20),
      borderRadius: ms(10),
      borderWidth: ms(5),
      borderColor: colors.pageHead,
      backgroundColor: colors.card,
      marginHorizontal: ms(Values.CONTAINER_MARGIN),
    },
    active: {
      backgroundColor: colors.secondary,
    },
    radioLabel: {
      fontFamily: 'Montserrat-Medium',
      fontSize: ms(Values.M),
      color: colors.pageHead,
    },
    title: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: ms(Values.L),
      color: colors.pageHead,
      marginBottom: ms(Values.CONTAINER_MARGIN),
    },
    forms: {
      flexWrap: 'wrap',
      flexDirection: orientation === 'LANDSCAPE' ? 'row' : 'column',
      gap: ms(Values.CONTAINER_MARGIN),
    },
  });
};

export default useStyles;
