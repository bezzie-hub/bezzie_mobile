import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

import Values from '@config/values';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {colors} = useTheme();
  const {ms} = useScale();

  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    innerContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      borderRadius: ms(Values.BORDER_RADIUS),
      marginHorizontal: '5%',
      marginBottom: ms(Values.CONTAINER_MARGIN / 2),
      backgroundColor: colors.primary,
    },
    item: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: ms(Values.CONTAINER_PADDING),
      paddingBottom: ms(Values.CONTAINER_PADDING * 1.5),
    },
    focused: {
      height: ms(5),
      position: 'absolute',
      bottom: 0,
      width: ms(50),
      borderTopLeftRadius: ms(20),
      borderTopRightRadius: ms(20),
      overflow: 'hidden',
      backgroundColor: colors.secondaryShade,
    },
    itemBtn: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    badgeStyle: {
      position: 'absolute',
      top: ms(-Values.CONTAINER_PADDING / 2),
      left: 0,
      marginLeft: ms(40),
      right: ms(0),
    },
  });
};

export default useStyles;
