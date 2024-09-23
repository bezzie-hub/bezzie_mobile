import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import useCommonStyles from '@config/useCommonStyles';
import useStyles from './useStyles';
import Header from '@components/header';
import CustomStatusBar from '@components/customStatusBar';
import useGetTheme from '@utils/useGetTheme';
import useOrderDetailState from './useOrderDetails';
import useGetOrientation from '@src/utils/useGetOrientation';
import getImagePath from '@src/utils/getPath';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, ROUTER} from '@src/navigations/routes';

const OrderDetails = (props: any) => {
  const {colors} = useTheme();
  const commonStyles = useCommonStyles(true);
  const styles = useStyles();
  const {isDark} = useGetTheme();
  const {loading, order} = useOrderDetailState(props);
  const orientation = useGetOrientation();
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();

  const shippingDetails = (
    <View style={styles.details}>
      <View style={[styles.orderDetailsTile]}>
        <Text allowFontScaling={false} style={[styles.orderText]}>
          Shipping Address
        </Text>
        <View style={styles.addressContainer}>
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              allowFontScaling={false}
              style={[styles.itemTitle]}>
              {order?.shipping_address?.custom_full_name || ''}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              allowFontScaling={false}
              style={[styles.itemTitle]}>
              {order?.shipping_address?.address_line1 || ''}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              allowFontScaling={false}
              style={[styles.itemTitle]}>
              {order?.shipping_address?.address_line2 || ''}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              allowFontScaling={false}
              style={[styles.itemTitle]}>
              {order?.shipping_address?.city || ''},{' '}
              {order?.shipping_address?.state || ''},{' '}
              {order?.shipping_address?.pincode || ''}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              allowFontScaling={false}
              style={[styles.itemTitle]}>
              {order?.shipping_address?.country || ''}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              allowFontScaling={false}
              style={[styles.itemTitle]}>
              Phone number: {order?.shipping_address?.phone || ''}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={colors.secondary} size={'large'} />
        </View>
      ) : (
        <View
          style={[
            commonStyles.container,
            {backgroundColor: colors.background},
          ]}>
          <Header title={'Order Details'} />
          <FlatList
            data={order?.order?.items || []}
            key={'order-' + orientation}
            contentContainerStyle={styles.listContainer}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.item_name}
            numColumns={orientation === 'LANDSCAPE' ? 2 : 1}
            renderItem={({item}) => {
              return (
                <View style={styles.itemWrapper}>
                  <Pressable
                    onPress={() =>
                      navigate(ROUTER.PDP as keyof RootStackParamList, {
                        item_code: item.item_code,
                      })
                    }
                    style={[commonStyles.shadow, styles.item]}
                    key={item.item_name}>
                    <Image
                      source={{
                        uri: getImagePath(item.image),
                      }}
                      style={styles.itemImg}
                      resizeMethod="resize"
                      resizeMode="cover"
                    />
                    <View style={styles.itemLeft}>
                      <View>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode={'tail'}
                          maxFontSizeMultiplier={1}
                          style={[styles.productTitle]}>
                          {item.item_name}
                        </Text>
                        <Text maxFontSizeMultiplier={1} style={[styles.price]}>
                          {order?.order?.price_list_currency}{' '}
                          {item.price_list_rate}
                        </Text>
                      </View>
                      <View style={styles.tileBottom}>
                        <Text
                          maxFontSizeMultiplier={1}
                          style={[styles.itemCount]}>
                          Qty {item.qty}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              );
            }}
            ListHeaderComponent={
              <>
                <View style={styles.topSection}>
                  <View style={styles.details}>
                    <View style={[styles.orderDetailsTile]}>
                      <Text allowFontScaling={false} style={[styles.orderText]}>
                        #{order?.order?.name || ''}
                      </Text>
                      <View
                        style={[styles.priceDetailContainer, styles.noStatus]}>
                        <View style={styles.priceItem}>
                          <Text
                            maxFontSizeMultiplier={1}
                            style={[styles.priceText]}>
                            Net Total
                          </Text>
                          <Text
                            maxFontSizeMultiplier={1}
                            style={[styles.priceText, styles.priceAmount]}>
                            {order?.order?.currency || ''}{' '}
                            {order?.order?.net_total || '0'}
                          </Text>
                        </View>
                        {(order?.order?.taxes || []).map((taxItem: any) => {
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
                                {order.currency || ''}{' '}
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
                            {order?.order?.currency || ''}{' '}
                            {order?.order?.grand_total || '0'}
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
                            {order?.order?.currency || ''}{' '}
                            {order?.order?.rounding_adjustment || '0'}
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
                            {order?.order?.currency || ''}{' '}
                            {order?.order?.rounded_total || '0'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  {orientation === 'LANDSCAPE' && shippingDetails}
                </View>
                <View
                  style={[
                    styles.orderDetailsTile,
                    styles.orderedProductsTitle,
                  ]}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.orderedProductsText]}>
                    Ordered Products
                  </Text>
                </View>
              </>
            }
            ListFooterComponent={
              orientation === 'PORTRAIT' ? shippingDetails : <View />
            }
          />
        </View>
      )}
    </>
  );
};

export default OrderDetails;
