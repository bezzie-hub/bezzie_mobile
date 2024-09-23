import React from 'react';
import {
  Text,
  FlatList,
  View,
  Pressable,
  Image,
  useWindowDimensions,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import {useTheme, useNavigation} from '@react-navigation/native';

import useStyles from './useStyles';
import useScale from '@utils/useScale';
import useGetOrientation from '@utils/useGetOrientation';
import getImagePath from '@src/utils/getPath';
import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTER, RootStackParamList} from '@src/navigations/routes';
import FadeInView from '@src/components/fadeIn';

type PropType = {
  width: number;
  products: any[];
  loading: boolean;
  loadNextPage: () => void;
  onReload: () => void;
  isRefreshing: boolean;
};

const List: React.FC<PropType> = ({
  products,
  loading,
  loadNextPage,
  onReload,
  isRefreshing,
}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const {ms} = useScale();
  const orientation = useGetOrientation();
  const {width} = useWindowDimensions();
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();

  const columns = parseInt((width / 200).toFixed(0), 10);

  const renderItem = ({item, index}: {item: any; index: number}) => {
    let mtop = columns === 2 && index % 2 === 1 ? ms(30) : 0;
    return (
      <FadeInView
        key={item.key}
        itemStyles={{
          ...styles.item,
          marginTop: mtop,
        }}>
        <Pressable
          style={{backgroundColor: colors.card, ...styles.imgStyle}}
          onPress={() =>
            navigate(ROUTER.PDP as keyof RootStackParamList, {
              item_code: item.item_code,
            })
          }>
          <Image
            source={{uri: getImagePath(item.website_image)}}
            style={[styles.imgStyle, styles.image]}
            resizeMethod="resize"
            resizeMode="cover"
          />
          <View style={[styles.itemDetail]}>
            <Text
              allowFontScaling={false}
              style={[styles.itemTitle]}
              numberOfLines={2}
              ellipsizeMode={'tail'}>
              {item.item_name || ''}
            </Text>
            <Text
              allowFontScaling={false}
              style={[styles.price, {color: colors.secondaryShade}]}>
              {item.formatted_price || ''}
            </Text>
          </View>
        </Pressable>
      </FadeInView>
    );
  };

  return (
    <FlatList
      key={`productList-${orientation}-${columns}`}
      data={products || []}
      keyExtractor={(item, index) => `plp-${index}`}
      contentContainerStyle={styles.listContainer}
      style={styles.list}
      numColumns={columns}
      renderItem={renderItem}
      onEndReached={loadNextPage}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          colors={[colors.primary]}
          onRefresh={onReload}
        />
      }
      ListFooterComponent={
        <View style={styles.listFooter}>
          {loading && (
            <ActivityIndicator color={colors.secondary} size="large" />
          )}
        </View>
      }
      ListEmptyComponent={
        !loading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText} maxFontSizeMultiplier={1}>
              No Products Found in the selected criteria
            </Text>
          </View>
        ) : (
          <View />
        )
      }
    />
  );
};

export default List;
