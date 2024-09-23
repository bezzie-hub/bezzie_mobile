import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import Values from '@config/values';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {colors} = useTheme();
  const {ms} = useScale();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.background,
      alignItems: 'center',
      paddingHorizontal: ms(Values.CONTAINER_MARGIN),
      paddingVertical: ms(Values.CONTAINER_MARGIN),
    },
    searchIcon: {
      width: ms(30),
    },
    searchInput: {
      color: colors.text,
      flex: 1,
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Regular',
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: ms(Values.BORDER_RADIUS),
      marginHorizontal: ms(Values.CONTAINER_MARGIN),
      flex: 1,
      borderBottomWidth: ms(1),
      borderColor: colors.text,
    },
    filter: {
      height: ms(40),
      width: ms(40),
      justifyContent: 'center',
      borderRadius: ms(Values.BORDER_RADIUS),
      marginVertical: ms(Values.CONTAINER_MARGIN),
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: colors.secondary,
    },
  });
};

export default useStyles;
