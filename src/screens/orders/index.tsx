import React from 'react';
import {Text, View, Image, Pressable, FlatList} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import useStyles from './useStyles';
import OptimizedScene from '@components/optimizedScene';
import AnimatedListItem from '@components/animatedListItem';
import useCommonStyles from '@config/useCommonStyles';
import Header from '@components/header';
import {ROUTER, RootStackParamList} from '@navigations/routes';
import CustomStatusBar from '@components/customStatusBar';
import useGetTheme from '@utils/useGetTheme';
import useOrdersState from './useOrdersState';
import {StackNavigationProp} from '@react-navigation/stack';
import getImagePath from '@src/utils/getPath';

const Orders = (props: any) => {
  const {colors} = useTheme();
  const commonStyles = useCommonStyles(true);
  const styles = useStyles();
  const {isDark} = useGetTheme();
  const {orders, loading} = useOrdersState();
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();

  const renderItem = ({item}: {item: any; index: number}) => {
    return (
      <AnimatedListItem index={0}>
        <View style={[styles.order]}>
          <View style={styles.orderTitleContainer}>
            <Text maxFontSizeMultiplier={1} style={[styles.orderNumber]}>
              #{item.name}
            </Text>
            <Pressable
              onPress={() => {
                props.navigation.navigate(ROUTER.ORDER_DETAILS, {
                  orderId: item.name,
                });
              }}>
              <Text maxFontSizeMultiplier={1} style={[styles.viewDetailText]}>
                View Details
              </Text>
            </Pressable>
          </View>
          <View style={styles.orderItems}>
            {item.items.map(
              (p: {
                item_name: string;
                price_list_rate: number;
                color: string;
                qty: number;
                item_code: string;
                image: string;
              }) => {
                return (
                  <Pressable
                    onPress={() =>
                      navigate(ROUTER.PDP as keyof RootStackParamList, {
                        item_code: p.item_code,
                      })
                    }
                    style={[commonStyles.shadow, styles.item]}
                    key={p.item_name}>
                    <Image
                      source={{
                        uri: getImagePath(p.image),
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
                          style={[styles.itemTitle]}>
                          {p.item_name}
                        </Text>
                        <Text maxFontSizeMultiplier={1} style={[styles.price]}>
                          {item.currency} {p.price_list_rate}
                        </Text>
                      </View>
                      <View style={styles.tileBottom}>
                        <Text
                          maxFontSizeMultiplier={1}
                          style={[styles.itemCount]}>
                          Qty {p.qty}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                );
              },
            )}
          </View>
        </View>
      </AnimatedListItem>
    );
  };

  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <OptimizedScene loading={loading}>
        <View style={[commonStyles.container]}>
          <Header title="Your Orders" />
          <FlatList
            contentContainerStyle={commonStyles.scrollContent}
            renderItem={renderItem}
            data={orders || []}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText} maxFontSizeMultiplier={1}>
                  No Orders Yet
                </Text>
              </View>
            }
          />
        </View>
      </OptimizedScene>
    </>
  );
};

export default Orders;
