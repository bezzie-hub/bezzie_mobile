import {StyleSheet} from 'react-native';

import useScale from '../../utils/useScale';
import {useTheme} from '@react-navigation/native';

const useStyles = ({
  overridePickerBackground,
}: {
  overridePickerBackground?: string;
}) => {
  const {ms} = useScale();
  const {colors} = useTheme();

  return StyleSheet.create({
    pickerItemStyle: {
      fontSize: ms(14),
      fontFamily: 'Inter-Regular',
      padding: ms(0),
      margin: 0,
      backgroundColor: overridePickerBackground
        ? overridePickerBackground
        : colors.background,
    },
    dropdown: {
      width: '100%',
      padding: ms(0),
      margin: 0,
      alignSelf: 'flex-start',
      color: colors.text,
      height: '100%',
      marginTop: ms(-5),
      marginLeft: ms(-10),
    },
    iosText: {
      color: colors.text,
      fontSize: ms(14),
      fontFamily: 'Inter-Regular',
    },
    iosBtn: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
};

export default useStyles;
