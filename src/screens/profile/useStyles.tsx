import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import useCommonStyles from '@config/useCommonStyles';

const useStyles = () => {
  const {colors} = useTheme();
  const commonStyles = useCommonStyles();

  return StyleSheet.create({
    container: {
      ...commonStyles.container,
    },
    innerContainer: {
      ...commonStyles.innerContainer,
      backgroundColor: colors.background,
    },
  });
};

export default useStyles;
