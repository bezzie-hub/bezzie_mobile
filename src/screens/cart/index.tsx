import React from 'react';
import {Text, View, FlatList, Pressable} from 'react-native';

import {useTheme} from '@react-navigation/native';

import useStyles from './useStyles';
import useCommonStyles from '@config/useCommonStyles';
import OptimizedScene from '@components/optimizedScene';
import AnimatedListItem from '@components/animatedListItem';
import CustomStatusBar from '@components/customStatusBar';
import {ROUTER} from '@navigations/routes';
import Item from './item';
import useGetTheme from '@utils/useGetTheme';
import useGetOrientation from '@utils/useGetOrientation';
import useCartState from './useCartState';

const Cart = (props: any) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const {isDark} = useGetTheme();
  const orientation = useGetOrientation();
  const {cart, loading} = useCartState();

  const renderItem = ({item, index}: any) => (
    <Item
      key={item.item_code}
      index={index}
      item={{...item, currency: cart?.cart.currency}}
    />
  );

  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <OptimizedScene loading={loading}>
        <View style={[styles.container]}>
          <Text
            style={[commonStyles.headText, styles.title]}
            maxFontSizeMultiplier={1}>
            Cart
          </Text>
          <View style={[styles.innerContainer]}>
            <FlatList
              key={'cart-' + orientation}
              contentContainerStyle={commonStyles.scrollContent}
              data={cart?.items || []}
              keyExtractor={item => item.item_name}
              renderItem={renderItem}
              numColumns={orientation === 'LANDSCAPE' ? 2 : 1}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText} maxFontSizeMultiplier={1}>
                    No Items in Cart
                  </Text>
                </View>
              }
              ListFooterComponent={
                cart?.cart?.items && cart?.cart?.items?.length > 0 ? (
                  <AnimatedListItem index={cart?.cart?.items?.length || 0}>
                    <View style={styles.priceDetailContainer}>
                      <View style={styles.priceItem}>
                        <Text
                          maxFontSizeMultiplier={1}
                          style={[styles.priceText]}>
                          Net Total
                        </Text>
                        <Text
                          maxFontSizeMultiplier={1}
                          style={[styles.priceText, styles.priceAmount]}>
                          {cart?.cart.currency || ''}{' '}
                          {cart?.cart.net_total || '0'}
                        </Text>
                      </View>
                      {(cart?.cart?.taxes || []).map((taxItem: any) => {
                        return (
                          <View style={styles.priceItem} key={taxItem.name}>
                            <Text
                              maxFontSizeMultiplier={1}
                              style={[styles.priceText]}>
                              {taxItem?.description || ''}
                            </Text>
                            <Text
                              maxFontSizeMultiplier={1}
                              style={[styles.priceText, styles.priceAmount]}>
                              {cart?.cart.currency || ''}{' '}
                              {taxItem.tax_amount || '0'}
                            </Text>
                          </View>
                        );
                      })}
                      <View style={styles.priceItem}>
                        <Text
                          maxFontSizeMultiplier={1}
                          style={[styles.priceText]}>
                          Grand Total
                        </Text>
                        <Text
                          maxFontSizeMultiplier={1}
                          style={[styles.priceText, styles.priceAmount]}>
                          {cart?.cart.currency || ''}{' '}
                          {cart?.cart.grand_total || '0'}
                        </Text>
                      </View>
                      <View style={styles.priceItem}>
                        <Text
                          maxFontSizeMultiplier={1}
                          style={[styles.priceText]}>
                          Rounding Adjustment
                        </Text>
                        <Text
                          maxFontSizeMultiplier={1}
                          style={[styles.priceText, styles.priceAmount]}>
                          {cart?.cart.currency || ''}{' '}
                          {cart?.cart.rounding_adjustment || '0'}
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
                          {cart?.cart.currency || ''}{' '}
                          {cart?.cart.rounded_total || '0'}
                        </Text>
                      </View>
                      <Pressable
                        style={[styles.btnContainer, styles.btnStyle]}
                        android_ripple={{
                          radius: 20,
                          borderless: true,
                          color: colors.white,
                        }}
                        onPress={() => {
                          props.navigation.navigate(ROUTER.CHECKOUT);
                        }}>
                        <Text
                          maxFontSizeMultiplier={1}
                          style={[styles.btnTitle]}>
                          Checkout
                        </Text>
                      </Pressable>
                    </View>
                  </AnimatedListItem>
                ) : (
                  <View />
                )
              }
            />
          </View>
        </View>
      </OptimizedScene>
    </>
  );
};

export default Cart;
