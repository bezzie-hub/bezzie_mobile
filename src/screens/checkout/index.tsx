import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import useCommonStyles from '@config/useCommonStyles';
import useStyles from './useStyles';
import OptimizedScene from '@components/optimizedScene';
import CustomStatusBar from '@components/customStatusBar';

import AddressModal from './addressModal';
import Payment from './payment';
import Pricing from './pricing';
import Header from '@components/header';
import Address from './address';
import useCheckoutState from './useCheckoutState';
import useGetTheme from '@src/utils/useGetTheme';
import OrderPlacedModal from './orderPlacedModal';
import {ROUTER} from '@src/navigations/routes';

const Checkout: React.FC<any> = props => {
  const {colors} = useTheme();
  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const {
    showAddressModal,
    setShowAddressModal,
    cart,
    isUpdatingAddress,
    onSelectAddress,
    onPlaceOrder,
    isPlacingOrder,
    orderPlacedModalOpen,
    setOrderPlacedModalOpen,
  } = useCheckoutState(props);
  const {isDark} = useGetTheme();

  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <OptimizedScene>
        <>
          <OrderPlacedModal
            open={orderPlacedModalOpen}
            setOpen={() => {
              props.navigation.navigate(ROUTER.CART);
              setOrderPlacedModalOpen(false);
            }}
          />
          {isPlacingOrder && (
            <View style={styles.addressOverlay}>
              <ActivityIndicator color={colors.secondary} size={'large'} />
            </View>
          )}
          <AddressModal
            confirmOpen={showAddressModal.show}
            cancelAction={() => {
              setShowAddressModal({
                show: false,
              });
            }}
            selectedAddress={cart?.cart?.customer_address}
            onSelectAddress={onSelectAddress}
            isUpdatingAddress={isUpdatingAddress}
          />
          <View style={[styles.container]}>
            <Header title={'Checkout'} />
            {cart?.cart_id ? (
              <View style={[styles.innerContainer]}>
                <ScrollView
                  contentContainerStyle={[commonStyles.scrollContent]}>
                  <View style={styles.selections}>
                    <Address
                      setShowAddressModal={setShowAddressModal}
                      cart={cart}
                    />
                    <Payment
                      totalAmount={`${cart?.cart.currency || ''} ${
                        cart?.cart.rounded_total || '0'
                      }`}
                    />
                  </View>
                  <Pricing cart={cart} onPlaceOrder={onPlaceOrder} />
                </ScrollView>
              </View>
            ) : (
              <View style={styles.emptyCartContainer}>
                <Text style={styles.emptyText} maxFontSizeMultiplier={1}>
                  No Items to Checkout
                </Text>
              </View>
            )}
          </View>
        </>
      </OptimizedScene>
    </>
  );
};
export default Checkout;
