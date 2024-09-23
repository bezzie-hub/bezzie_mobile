import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

import Values from '@config/values';
import useScale from '@utils/useScale';

const useStyles = () => {
  const {colors} = useTheme();
  const {ms} = useScale();

  return StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      width: '100%',
      backgroundColor: colors.background,
    },
    contentContainer: {
      paddingBottom: ms(50),
      width: '95%',
      alignSelf: 'center',
      backgroundColor: colors.background,
    },
    list: {
      flexDirection: 'row',
      width: '100%',
      alignSelf: 'center',
      flexWrap: 'wrap',
    },
    first: {
      paddingTop: ms(50),
    },
    accordionSectionContainer: {
      backgroundColor: colors.card,
      padding: ms(Values.CONTAINER_PADDING),
      marginBottom: ms(5),
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
    colorItem: {
      padding: ms(Values.TEXT_PADDING),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: ms(Values.BORDER_RADIUS),
      marginHorizontal: ms(Values.TEXT_MARGIN),
      marginVertical: ms(Values.TEXT_MARGIN),
      width: ms(40),
      height: ms(40),
    },
    color: {
      margin: 0,
      padding: 0,
      borderWidth: 0,
    },
    btnContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingBottom: ms(Values.CONTAINER_PADDING),
      paddingTop: ms(Values.CONTAINER_PADDING / 5),
      marginHorizontal: ms(Values.CONTAINER_MARGIN),
      overflow: 'hidden',
      backgroundColor: colors.background,
      gap: ms(Values.CONTAINER_MARGIN),
    },
    btn: {
      flex: 1,
    },
    accordion: {
      marginBottom: ms(2),
    },
    accordionTitle: {
      fontSize: ms(Values.L),
      fontFamily: 'Montserrat-Regular',
      color: colors.contentText,
    },
    accordionContentStyle: {
      marginTop: ms(2 * Values.TEXT_MARGIN),
    },
    clearBtn: {
      borderRadius: ms(Values.BORDER_RADIUS),
      height: ms(Values.BUTTON_HEIGHT),
      borderWidth: ms(1),
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.contentText,
    },
    applyBtn: {
      borderRadius: ms(Values.BORDER_RADIUS),
      height: ms(Values.BUTTON_HEIGHT),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.success,
    },
    closeBtnContainer: {
      position: 'absolute',
      top: ms(15),
      right: 0,
      padding: 0,
      zIndex: 1000,
    },
    listSectionTitle: {
      fontSize: ms(Values.XL),
      fontFamily: 'Montserrat-Regular',
    },
    f10: {
      fontSize: ms(Values.S),
      fontFamily: 'Montserrat-Regular',
    },
    mt30: {
      marginTop: ms(30),
    },
    btnText: {
      fontSize: ms(Values.M),
      fontFamily: 'Montserrat-Regular',
    },
    clearBtnText: {
      color: colors.contentText,
    },
    applyBtnText: {
      color: colors.white,
    },
  });
};

export default useStyles;
