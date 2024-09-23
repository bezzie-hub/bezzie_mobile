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
    swipeContainerStyle: {
      width: '100%',
      marginBottom: ms(Values.CONTAINER_MARGIN),
      height: ms(125),
    },
    animItem: {
      width: orientation === 'LANDSCAPE' ? '50%' : '100%',
      height: ms(125),
      paddingHorizontal: ms(Values.CONTAINER_MARGIN),
      marginBottom: ms(Values.CONTAINER_MARGIN),
    },
    item: {
      flexDirection: 'row',
      borderRadius: ms(Values.BORDER_RADIUS),
      marginBottom: ms(Values.CONTAINER_MARGIN),
      alignSelf: 'center',
      overflow: 'hidden',
      justifyContent: 'space-between',
      paddingVertical: ms(Values.CONTAINER_PADDING),
      paddingLeft: ms(Values.TEXT_PADDING),
      backgroundColor: colors.card,
      height: '100%',
    },
    addAddress: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Bold',
      marginTop: ms(Values.TEXT_MARGIN),
      textAlign: 'right',
      textDecorationLine: 'underline',
    },
    addBtn: {alignSelf: 'flex-end', marginRight: ms(Values.CONTAINER_MARGIN)},
    itemLeft: {
      paddingHorizontal: ms(Values.CONTAINER_PADDING),
      overflow: 'hidden',
      flex: 5,
    },
    itemTitle: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Bold',
      lineHeight: ms(18),
      color: colors.contentText,
    },
    itemDesc: {
      fontSize: ms(Values.S),
      fontFamily: 'Montserrat-Regular',
      lineHeight: ms(18),
      color: colors.contentText,
    },
    addressOverlay: {
      flex: 1,
      zIndex: 100,
      backgroundColor: colors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    emptyContainer: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: ms(50),
    },
    emptyText: {
      fontSize: ms(Values.L),
      color: colors.text,
      fontFamily: 'Montserrat-Regular',
    },
  });
};

export default useStyles;
