import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import useScale from '@utils/useScale';

function useStyles() {
  const {ms} = useScale();
  const {colors} = useTheme();

  return StyleSheet.create({
    modal: {
      backgroundColor: colors.overlay,
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      backgroundColor: colors.background,
      width: '90%',
      maxWidth: ms(400),
      borderRadius: ms(10),
      paddingVertical: ms(25),
      paddingHorizontal: ms(20),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.secondary,
    },
    modalClose: {
      position: 'absolute',
      right: ms(15),
      top: ms(15),
      zIndex: 10,
    },
  });
}

export default useStyles;
