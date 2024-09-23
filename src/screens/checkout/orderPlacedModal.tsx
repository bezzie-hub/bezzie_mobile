import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import useStyles from './useStyles';
import ModalStructure from '@src/components/modalStructure';
import LottieView from 'lottie-react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTER, RootStackParamList} from '@src/navigations/routes';

const OrderPlacedModal: React.FC<{
  open: boolean;
  setOpen: (v: boolean) => void;
}> = ({open, setOpen}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <>
      <ModalStructure
        modalVisible={open}
        setModalVisible={() => {
          navigate(ROUTER.CART! as keyof RootStackParamList);
          setOpen(false);
        }}>
        <LottieView
          source={require('../../assets/anim/success.json')}
          autoPlay
          loop={false}
          style={styles.lottie}
        />
        <Text maxFontSizeMultiplier={1} style={styles.confirmText}>
          Your order has been placed successfully
        </Text>
        <View style={[styles.modalBtnContainer]}>
          <Pressable
            style={[styles.btn, styles.cancelBtn]}
            android_ripple={{
              radius: 20,
              borderless: true,
              color: colors.white,
            }}
            onPress={() => {
              setOpen(false);
              navigate(ROUTER.PLP! as keyof RootStackParamList);
            }}>
            <Text
              allowFontScaling={false}
              style={[styles.btnText, styles.cancelBtnText]}>
              Continue Shopping
            </Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.confirmBtn]}
            android_ripple={{
              radius: 20,
              borderless: true,
              color: colors.white,
            }}
            onPress={() => {
              setOpen(false);
              navigate(ROUTER.ORDERS! as keyof RootStackParamList);
            }}>
            <Text
              allowFontScaling={false}
              style={[styles.btnText, styles.confirmBtnText]}>
              Go To Orders
            </Text>
          </Pressable>
        </View>
      </ModalStructure>
    </>
  );
};
export default OrderPlacedModal;
