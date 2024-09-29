import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

import Values from '@config/values';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {colors} = useTheme();
  const {ms} = useScale();

  return StyleSheet.create({
    accordionSectionContainer: {
      backgroundColor: colors.card,
      padding: ms(Values.CONTAINER_PADDING),
      marginBottom: ms(5),
    },
    accordionTitle: {
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Regular',
      color: colors.contentText,
    },
    itemStyle: {
      borderWidth: ms(1),
      borderRadius: ms(Values.BORDER_RADIUS),
      minWidth: ms(30),
      paddingHorizontal: ms(Values.TEXT_PADDING),
      height: ms(30),
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: ms(Values.TEXT_MARGIN),
      marginVertical: ms(Values.TEXT_MARGIN),
    },
    list: {
      flexDirection: 'row',
      width: '100%',
      alignSelf: 'center',
      flexWrap: 'wrap',
    },
    accordionContentStyle: {
      marginTop: ms(2 * Values.TEXT_MARGIN),
    },
    f10: {
      fontSize: ms(Values.S),
      fontFamily: 'Montserrat-Regular',
    },
    parent: {
      width: '100%',
    },
    content: {
      width: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
    },
    animatedContent: {
      width: '100%',
      overflow: 'hidden',
    },
  });
};

export default useStyles;
