import React, {useRef, useState} from 'react';
import {Text, View, Image, Pressable, TextInput} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDebouncedCallback} from 'use-debounce';

import useStyles from './useStyles';

import Swipe from '@components/swipeActions';
import AnimatedListItem from '@components/animatedListItem';
import {RootStackParamList, ROUTER} from '@navigations/routes';
import useScale from '@utils/useScale';
import getImagePath from '@src/utils/getPath';
import {addToCart} from '@src/store/slices/cart';
import {useAppDispatch} from '@src/store/hooks';
import NumericInput from '@src/components/numericInput';

const Item: React.FC<{
  item: any;
  index: number;
}> = ({index, item}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const {ms} = useScale();
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [qty, setQty] = useState(item.qty);
  const dispatch = useAppDispatch();
  const inputRef = useRef<TextInput>(null);
  const [showMsg, setShowMsg] = useState(false);

  const onChangeQty = async (v: number) => {
    setShowMsg(false);
    setQty(v || 0);
    const res = await dispatch(
      addToCart({
        item_code: item.item_code,
        qty: v,
        with_items: 1,
      }),
    );
    if (addToCart.rejected.match(res)) {
      inputRef.current?.setNativeProps({text: (item.qty || 0).toString()});
      setQty(item.qty || 0);
      setShowMsg(true);
    }
  };

  const debouncedOnChangeQty = useDebouncedCallback(onChangeQty, 300);

  return (
    <>
      <AnimatedListItem index={index} styles={[styles.animItem]}>
        <Swipe
          itemStyle={[styles.item]}
          leftIcon={{
            type: 'material',
            name: 'delete-outline',
          }}
          rightIcon={{
            type: 'material',
            name: 'delete-outline',
          }}
          leftIconType="danger"
          rightIconType="danger"
          containerStyle={styles.swipeContainerStyle}
          leftAction={() => {
            onChangeQty(0);
          }}
          rightAction={() => {
            onChangeQty(0);
          }}>
          <Pressable
            onPress={() =>
              navigate(ROUTER.PDP as keyof RootStackParamList, {
                item_code: item.item_code,
              })
            }>
            <Image
              source={{uri: getImagePath(item.image)}}
              style={styles.imgStyle}
              resizeMethod="resize"
              resizeMode="cover"
            />
          </Pressable>
          <View style={styles.itemRight}>
            <Text
              numberOfLines={2}
              ellipsizeMode={'tail'}
              maxFontSizeMultiplier={1}
              style={[styles.itemTitle]}>
              {item.item_name}
            </Text>
            <Text maxFontSizeMultiplier={1} style={[styles.subTitle]}>
              {item.brand}
            </Text>
            <View style={styles.tileBottom}>
              <NumericInput
                onChange={debouncedOnChangeQty}
                value={qty}
                totalWidth={ms(65)}
                totalHeight={ms(25)}
                minValue={0}
                editable={false}
                rounded
                textColor={colors.contentText}
                iconColor={colors.card}
                iconSize={ms(14)}
                rightButtonBackgroundColor={colors.cartBtn}
                leftButtonBackgroundColor={colors.cartBtn}
                inputStyle={styles.bw0}
                borderColor={'transparent'}
                ref={inputRef}
              />
              <Text maxFontSizeMultiplier={1} style={[styles.price]}>
                {item.currency} {item.rate}
              </Text>
            </View>
          </View>
        </Swipe>
      </AnimatedListItem>
      {(qty > item.in_stock_qty || showMsg) && (
        <Text style={styles.error}>
          Requested quantity not available. Available qantity only{' '}
          {item.in_stock_qty}
        </Text>
      )}
    </>
  );
};

export default Item;
