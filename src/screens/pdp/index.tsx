import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import type {ICarouselInstance} from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useStyles from './useStyles';
import OptimizedScene from '@components/optimizedScene';
import CustomStatusBar from '@components/customStatusBar';
import useGetTheme from '@utils/useGetTheme';
import useScale from '@utils/useScale';
import Header from '@components/header';
import useGetOrientation from '@utils/useGetOrientation';
import authCheckOnAction from '@utils/authCheckOnAction';
import usePDPState from './usePDPState';
import Config from 'react-native-config';
import {useAppDispatch} from '@src/store/hooks';
import {addToCart} from '@src/store/slices/cart';
import NumericInput from '@components/numericInput';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SBItem = ({item}: any) => {
  const styles = useStyles();
  return (
    <Image
      source={{uri: `${Config.BASE_URL}${item.image}`}}
      style={styles.cImg}
      resizeMode="contain"
      resizeMethod="scale"
    />
  );
};

const PDP: React.FC<any> = (props: any) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const {isDark} = useGetTheme();
  const {ms} = useScale();
  const {width, height} = useWindowDimensions();
  const ref = useRef<ICarouselInstance>(null);
  const [activeImg, setActiveImg] = useState(0);
  const orientation = useGetOrientation();
  const flatListRef = useRef<any>(null);
  const {product, productLoading, qty, setQty, addToCartLoading} =
    usePDPState(props);
  const dispatch = useAppDispatch();
  const inputRef = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);

  const instock = product?.product_info?.in_stock === 1;

  const addItemToCart = () =>
    authCheckOnAction(async () => {
      const res = await dispatch(
        addToCart({
          item_code: product.product_info.item_code,
          qty: qty,
          with_items: 1,
        }),
      );
      if (addToCart.fulfilled.match(res)) {
        setQty(qty || 0);
      } else {
        setQty(product.product_info.qty || 0);
      }
    });

  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <OptimizedScene loading={productLoading}>
        <View style={[styles.container]}>
          <Header title="Product Details" />
          {!product ? (
            <View />
          ) : (
            <>
              <ScrollView
                style={[styles.innerContainer]}
                contentContainerStyle={styles.contentContainer}>
                <View style={styles.topContainer}>
                  <View style={styles.pTop}>
                    <Carousel
                      vertical={true}
                      width={
                        orientation === 'LANDSCAPE'
                          ? (3 * height * 0.75) / 4
                          : width > 600
                          ? width * 0.6
                          : width * 0.75
                      }
                      height={
                        orientation === 'LANDSCAPE'
                          ? height * 0.75
                          : ((width > 600 ? width * 0.6 : width * 0.75) * 4) / 3
                      }
                      loop
                      ref={ref}
                      style={styles.pTopLeft}
                      autoPlay={false}
                      autoPlayInterval={2000}
                      data={product?.slideshow || []}
                      pagingEnabled={false}
                      onSnapToItem={index => {
                        setActiveImg(index);
                      }}
                      renderItem={({item, index}) => (
                        <SBItem key={index} index={index} item={item} />
                      )}
                    />
                    <View style={styles.pTopRight}>
                      <ScrollView
                        horizontal
                        style={styles.pTopRightScroll}
                        nestedScrollEnabled={true}
                        contentContainerStyle={styles.pTopRightScrollContent}>
                        <View style={styles.pTopRightView}>
                          <FlatList
                            ref={flatListRef}
                            key={`list-${orientation}-${
                              width > 600 ? 'lg' : 'sm'
                            }`}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            style={styles.pagFlatlist}
                            contentContainerStyle={styles.pTopRightContent}
                            data={product?.slideshow || []}
                            renderItem={({item, index}) => {
                              return (
                                <Pressable
                                  onPress={() => {
                                    ref.current?.scrollTo({
                                      index: index,
                                      animated: true,
                                    });
                                    setActiveImg(index);
                                  }}>
                                  <Image
                                    source={{
                                      uri: `${Config.BASE_URL}${item.image}`,
                                    }}
                                    style={[
                                      styles.pImg,
                                      activeImg === index
                                        ? styles.activeImg
                                        : {},
                                    ]}
                                    resizeMode="cover"
                                    resizeMethod="scale"
                                  />
                                </Pressable>
                              );
                            }}
                          />
                          {instock && (
                            <View style={styles.rightAddBtns}>
                              <Pressable
                                style={[styles.iconContainer]}
                                disabled={addToCartLoading || !instock}
                                onPress={() =>
                                  authCheckOnAction(async () => {
                                    await dispatch(
                                      addToCart({
                                        item_code:
                                          product.product_info.item_code,
                                        qty: qty,
                                        with_items: 1,
                                      }),
                                    );
                                  })
                                }>
                                <MaterialIcons
                                  color={colors.white}
                                  name={'add-shopping-cart'}
                                  size={ms(18)}
                                  allowFontScaling={false}
                                />
                              </Pressable>
                            </View>
                          )}
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                  <View style={styles.pDetailContainer}>
                    <Text
                      style={styles.pCategory}
                      maxFontSizeMultiplier={1}
                      numberOfLines={2}
                      adjustsFontSizeToFit>
                      {product?.product_info?.item_group || ''}
                    </Text>
                    <Text
                      style={styles.pTitle}
                      maxFontSizeMultiplier={1}
                      numberOfLines={2}
                      adjustsFontSizeToFit>
                      {product?.product_info?.item_name || ''}
                    </Text>
                    <View style={styles.priceContainer}>
                      <Text
                        style={styles.pPrice}
                        maxFontSizeMultiplier={1}
                        numberOfLines={2}
                        adjustsFontSizeToFit>
                        {product?.product_info?.price?.formatted_price || ''}
                      </Text>
                      {product?.product_info?.price?.formatted_mrp && (
                        <Text
                          style={styles.mrpPrice}
                          maxFontSizeMultiplier={1}
                          numberOfLines={2}
                          adjustsFontSizeToFit>
                          {product?.product_info?.price?.formatted_mrp || ''}
                        </Text>
                      )}
                      {product?.product_info?.price
                        ?.formatted_discount_percent && (
                        <Text
                          style={styles.offerPercent}
                          maxFontSizeMultiplier={1}
                          numberOfLines={2}
                          adjustsFontSizeToFit>
                          {product?.product_info?.price
                            ?.formatted_discount_percent || ''}{' '}
                          Off
                        </Text>
                      )}
                    </View>
                    {!instock && (
                      <View style={styles.outOfStock}>
                        <Ionicons
                          name="warning"
                          size={ms(17)}
                          color={colors.danger}
                        />
                        <Text
                          maxFontSizeMultiplier={1}
                          style={styles.outOfStockText}>
                          This Item is currently Out of Stock
                        </Text>
                      </View>
                    )}
                    <Text maxFontSizeMultiplier={1} style={styles.pDesc}>
                      {product?.product_info.description || ''}
                    </Text>
                    {orientation === 'LANDSCAPE' && instock && (
                      <View style={styles.lAddToCartContainer}>
                        <NumericInput
                          onChange={v => {
                            setQty(v);
                          }}
                          value={qty}
                          totalWidth={ms(120)}
                          totalHeight={ms(40)}
                          minValue={1}
                          editable={true}
                          rounded
                          textColor={colors.background}
                          iconColor={colors.secondary}
                          iconSize={ms(14)}
                          rightButtonBackgroundColor={colors.background}
                          leftButtonBackgroundColor={colors.background}
                          inputStyle={styles.nInput}
                          borderColor={colors.secondaryShade}
                          showBorder={true}
                          ref={inputRef}
                        />
                        <Pressable
                          style={[styles.addToCartBtn, styles.mLeft]}
                          disabled={addToCartLoading || !instock}
                          onPress={addItemToCart}>
                          {addToCartLoading ? (
                            <ActivityIndicator
                              color={colors.white}
                              size={'small'}
                            />
                          ) : (
                            <>
                              <MaterialIcons
                                color={colors.white}
                                name={'add-shopping-cart'}
                                size={ms(18)}
                                allowFontScaling={false}
                              />
                              <Text
                                maxFontSizeMultiplier={1}
                                style={styles.addToCartBtnText}>
                                Add To Cart
                              </Text>
                            </>
                          )}
                        </Pressable>
                      </View>
                    )}
                  </View>
                </View>
              </ScrollView>
              {orientation === 'PORTRAIT' && instock && (
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 0, y: 0}}
                  colors={
                    isDark
                      ? ['rgba(0,0,0,1)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']
                      : [
                          'rgba(255,255,255,1)',
                          'rgba(255,255,255,0.5)',
                          'rgba(255,255,255,0)',
                        ]
                  }
                  locations={[0.5, 0.9, 1]}
                  style={styles.linearGradient}>
                  <NumericInput
                    onChange={v => {
                      setQty(v);
                    }}
                    value={qty}
                    totalWidth={ms(100)}
                    totalHeight={ms(32)}
                    minValue={1}
                    editable={true}
                    rounded
                    textColor={colors.background}
                    iconColor={colors.secondary}
                    iconSize={ms(14)}
                    rightButtonBackgroundColor={colors.background}
                    leftButtonBackgroundColor={colors.background}
                    inputStyle={styles.nInput}
                    borderColor={colors.secondaryShade}
                    showBorder={true}
                    ref={inputRef2}
                  />
                  <Pressable
                    style={[styles.addToCartBtn, styles.mLeft]}
                    disabled={addToCartLoading || !instock}
                    onPress={addItemToCart}>
                    {addToCartLoading ? (
                      <ActivityIndicator color={colors.white} size={'small'} />
                    ) : (
                      <>
                        <MaterialIcons
                          color={colors.white}
                          name={'add-shopping-cart'}
                          size={ms(18)}
                          allowFontScaling={false}
                        />
                        <Text
                          maxFontSizeMultiplier={1}
                          numberOfLines={1}
                          adjustsFontSizeToFit
                          style={styles.addToCartBtnText}>
                          Add to Cart
                        </Text>
                      </>
                    )}
                  </Pressable>
                </LinearGradient>
              )}
            </>
          )}
        </View>
      </OptimizedScene>
    </>
  );
};

export default PDP;
