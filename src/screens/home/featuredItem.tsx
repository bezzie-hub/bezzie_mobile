import React, {useState} from 'react';
import {
  Text,
  View,
  Pressable,
  Animated,
  ImageStyle,
  ActivityIndicator,
} from 'react-native';

import authCheckOnAction from '@utils/authCheckOnAction';
import useStyles from './useStyles';
import getImagePath from '@src/utils/getPath';
import {navigate} from '@src/navigations';
import {ROUTER, RootStackParamList} from '@src/navigations/routes';
import {useTheme} from '@react-navigation/native';
import {useAppDispatch} from '@src/store/hooks';
import {addToCart} from '@src/store/slices/cart';

const FeaturedItem: React.FC<{
  item: any;
}> = ({item}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const [addingToCart, setAddingToCart] = useState(false);

  return (
    <View style={styles.featuredListItem}>
      <Pressable
        style={styles.featuredItemImgContainer}
        onPress={() =>
          navigate(ROUTER.PDP as keyof RootStackParamList, {
            item_code: item.item_code,
          })
        }>
        <Animated.Image
          source={{uri: getImagePath(item.website_image)}}
          style={styles.featuredItemImg as ImageStyle}
          resizeMethod="resize"
          resizeMode="cover"
        />
      </Pressable>
      <View style={[styles.featuredContent]}>
        <View>
          <Pressable
            onPress={() =>
              navigate(ROUTER.PDP as keyof RootStackParamList, {
                item_code: item.item_code,
              })
            }>
            <Text
              numberOfLines={3}
              textBreakStrategy="simple"
              maxFontSizeMultiplier={1}
              ellipsizeMode="tail"
              style={[styles.featuredItemTitle, {}]}>
              {item.item_name}
            </Text>
          </Pressable>
          <Text style={[styles.featuredItemCategory]} maxFontSizeMultiplier={1}>
            {item.item_group}
          </Text>
          <Text style={[styles.featuredItemPrice]} maxFontSizeMultiplier={1}>
            {item.formatted_price}
          </Text>
        </View>
        <Pressable
          style={[
            styles.featuredAddToCartBtn,
            !item.in_stock ? styles.disabledBtn : {},
          ]}
          disabled={!item.in_stock}
          onPress={() =>
            authCheckOnAction(async () => {
              setAddingToCart(true);
              await dispatch(
                addToCart({
                  item_code: item.item_code,
                  qty: 1,
                  with_items: 1,
                }),
              );
              setAddingToCart(false);
            })
          }>
          {addingToCart ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Text maxFontSizeMultiplier={1} style={styles.addToCartText}>
              Add to Cart
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default FeaturedItem;
