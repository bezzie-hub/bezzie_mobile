import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';

import useStyles from './useStyles';
import AnimatedListItem from '@src/components/animatedListItem';
import {Cart} from '@src/store/slices/cart';

const Pricing: React.FC<{
  cart: Cart;
  onPlaceOrder: () => void;
}> = ({cart, onPlaceOrder}) => {
  const {colors} = useTheme();
  const styles = useStyles();

  return (
    <AnimatedListItem index={2}>
      <View style={styles.priceDetailContainer}>
        <View style={styles.priceItem}>
          <Text maxFontSizeMultiplier={1} style={[styles.priceText]}>
            Net Total
          </Text>
          <Text
            maxFontSizeMultiplier={1}
            style={[styles.priceText, styles.priceAmount]}>
            {cart?.cart.currency || ''} {cart?.cart.net_total || '0'}
          </Text>
        </View>
        {(cart?.cart?.taxes || []).map((taxItem: any) => {
          return (
            <View style={styles.priceItem} key={taxItem.name}>
              <Text maxFontSizeMultiplier={1} style={[styles.priceText]}>
                {taxItem?.description || ''}
              </Text>
              <Text
                maxFontSizeMultiplier={1}
                style={[styles.priceText, styles.priceAmount]}>
                {cart?.cart.currency || ''} {taxItem.tax_amount || '0'}
              </Text>
            </View>
          );
        })}
        <View style={styles.priceItem}>
          <Text maxFontSizeMultiplier={1} style={[styles.priceText]}>
            Grand Total
          </Text>
          <Text
            maxFontSizeMultiplier={1}
            style={[styles.priceText, styles.priceAmount]}>
            {cart?.cart.currency || ''} {cart?.cart.grand_total || '0'}
          </Text>
        </View>
        <View style={styles.priceItem}>
          <Text maxFontSizeMultiplier={1} style={[styles.priceText]}>
            Rounding Adjustment
          </Text>
          <Text
            maxFontSizeMultiplier={1}
            style={[styles.priceText, styles.priceAmount]}>
            {cart?.cart.currency || ''} {cart?.cart.rounding_adjustment || '0'}
          </Text>
        </View>
        <View style={styles.dash} />
        <View style={styles.priceItem}>
          <Text
            maxFontSizeMultiplier={1}
            style={[styles.priceText, styles.bold]}>
            Rounded Total
          </Text>
          <Text
            maxFontSizeMultiplier={1}
            style={[styles.priceText, styles.priceAmount]}>
            {cart?.cart.currency || ''} {cart?.cart.rounded_total || '0'}
          </Text>
        </View>
        <Pressable
          style={[styles.btnContainer, styles.btnStyle]}
          android_ripple={{
            radius: 20,
            borderless: true,
            color: colors.white,
          }}
          onPress={onPlaceOrder}>
          <Text maxFontSizeMultiplier={1} style={[styles.btnTitle]}>
            Place Order
          </Text>
        </Pressable>
      </View>
    </AnimatedListItem>
  );
};
export default Pricing;
