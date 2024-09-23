import {StyleSheet} from 'react-native';

import useCommonStyles from '@config/useCommonStyles';
import Values from '@config/values';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {ms} = useScale();
  const commonStyles = useCommonStyles();

  return StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: ms(Values.CONTAINER_MARGIN),
    },
    headText: {
      ...commonStyles.headText,
      marginLeft: ms(Values.CONTAINER_MARGIN * 2),
    },
  });
};

export default useStyles;
