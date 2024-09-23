import {StyleSheet} from 'react-native';
import useScale from '@utils/useScale';
import Values from '@config/values';

const useStyles = () => {
  const {ms} = useScale();
  return StyleSheet.create({
    actionContainer: {
      width: ms(95),
    },
    leftAnimatedView: {
      flexDirection: 'row',
      borderTopLeftRadius: ms(Values.BORDER_RADIUS),
      borderBottomLeftRadius: ms(Values.BORDER_RADIUS),
      height: '100%',
      alignSelf: 'flex-start',
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      alignItems: 'center',
      width: ms(100),
      paddingLeft: ms(30),
    },
    rightAnimatedView: {
      flexDirection: 'row-reverse',
      borderTopRightRadius: ms(Values.BORDER_RADIUS),
      borderBottomRightRadius: ms(Values.BORDER_RADIUS),
      height: '100%',
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
      alignContent: 'flex-end',
      alignItems: 'center',
      width: ms(95),
      paddingRight: ms(30),
    },
    actionIconContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    actionIcon: {
      width: ms(95),
      textAlign: 'left',
    },
  });
};

export default useStyles;
