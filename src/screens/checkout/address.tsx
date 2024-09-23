import React from 'react';
import {Pressable, Text, View} from 'react-native';

import useCommonStyles from '@config/useCommonStyles';
import useStyles from './useStyles';

import AnimatedListItem from '@src/components/animatedListItem';
import {Cart} from '@src/store/slices/cart';

const Address: React.FC<{
  setShowAddressModal: (v: any) => void;
  cart: Cart;
}> = ({setShowAddressModal, cart}) => {
  const commonStyles = useCommonStyles();
  const styles = useStyles();

  return (
    <AnimatedListItem index={0} styles={[styles.w100]}>
      <>
        <View style={styles.rowSpacBtw}>
          <Text
            maxFontSizeMultiplier={1}
            style={[styles.sectionHead, styles.mt5]}>
            Address
          </Text>
          <Pressable
            onPress={() => {
              setShowAddressModal({
                show: true,
                type: 'Billing',
              });
            }}>
            <Text
              maxFontSizeMultiplier={1}
              style={[styles.changeText, styles.mt5]}>
              Change
            </Text>
          </Pressable>
        </View>
        <View key={cart?.billing_address} style={[styles.animItem]}>
          <View style={[commonStyles.shadow, styles.item]}>
            <View style={[styles.itemLeft, styles.justifyCenter]}>
              {cart?.billing_address ? (
                <View style={styles.paymentItem}>
                  <Text
                    maxFontSizeMultiplier={1}
                    numberOfLines={1}
                    style={[styles.paymentTitle]}>
                    {cart?.billing_address?.custom_full_name || ''}
                  </Text>
                  <Text
                    maxFontSizeMultiplier={1}
                    numberOfLines={1}
                    style={[styles.addressText]}>
                    {cart?.billing_address?.address_line1 || ''}
                  </Text>
                  <Text
                    maxFontSizeMultiplier={1}
                    numberOfLines={1}
                    style={[styles.addressText]}>
                    {cart?.billing_address?.address_line2 || ''}
                  </Text>
                  <Text
                    maxFontSizeMultiplier={1}
                    numberOfLines={1}
                    style={[styles.addressText]}>
                    {cart?.billing_address?.city || ''},{' '}
                    {cart?.billing_address?.state || ''},{''}{' '}
                    {cart?.billing_address?.pincode || ''}
                  </Text>
                  <Text
                    maxFontSizeMultiplier={1}
                    numberOfLines={1}
                    style={[styles.addressText]}>
                    {cart?.billing_address?.country || ''}
                  </Text>
                  <Text
                    maxFontSizeMultiplier={1}
                    numberOfLines={1}
                    style={[styles.addressText]}>
                    Phone number: {cart?.billing_address?.phone || ''}
                  </Text>
                </View>
              ) : (
                <Text
                  maxFontSizeMultiplier={1}
                  style={[styles.paymentTitle, styles.addressNotSelected]}>
                  No Address Selected
                </Text>
              )}
            </View>
          </View>
        </View>
      </>
    </AnimatedListItem>
  );
};
export default Address;
