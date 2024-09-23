import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  Animated,
  useWindowDimensions,
  Keyboard,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Badge} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';

import AnimatedListItem from '../animatedListItem';

import useCommonStyles from '@config/useCommonStyles';
import useStyles from './useStyles';
import useScale from '@utils/useScale';
import {ROUTER} from '@navigations/routes';
import authCheckOnAction from '@src/utils/authCheckOnAction';
import {useAppSelector} from '@src/store/hooks';

const TabBar = ({state, descriptors, navigation}: any) => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const [keyboardOn, setKeyboradOn] = useState(false);
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const {width} = useWindowDimensions();
  const {colors} = useTheme();
  const {ms} = useScale();
  const {cart} = useAppSelector(s => s.cart);

  const indicAnim = useRef(
    new Animated.Value(
      Math.ceil((width / 4) * state.index + (width / 4 - 50) / 2),
    ),
  ).current;

  useEffect(() => {
    Animated.spring(indicAnim, {
      toValue: Math.ceil(
        ((width * 0.9) / 4) * state.index + ((width * 0.9) / 4 - ms(50)) / 2,
      ),
      useNativeDriver: true,
      bounciness: 6,
    }).start();
  }, [indicAnim, ms, state.index, width]);

  const tabBarAnim = useRef(new Animated.Value(100)).current;
  const tabBarOpacity = useRef(new Animated.Value(0)).current;
  const indicOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardon = () => {
      setKeyboradOn(true);
    };
    const keyboardoff = () => {
      setKeyboradOn(false);
    };
    Keyboard.addListener('keyboardDidShow', keyboardon);
    Keyboard.addListener('keyboardDidHide', keyboardoff);
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  useEffect(() => {
    Animated.timing(indicOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Animated.timing(tabBarOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fadeIn(state.index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.index]);

  useEffect(() => {
    if (keyboardOn) {
      Animated.spring(tabBarAnim, {
        toValue: 100,
        useNativeDriver: true,
        bounciness: 6,
      }).start();
    } else {
      Animated.spring(tabBarAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 6,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyboardOn]);

  const fadeIn = (index: number) => {
    Animated.spring(indicAnim, {
      toValue: Math.ceil(
        ((width * 0.9) / 4) * index + ((width * 0.9) / 4 - ms(50)) / 2,
      ),
      useNativeDriver: true,
      bounciness: 6,
    }).start();
  };

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const getIcon = (route: any, isFocused: boolean) => {
    switch (route.name) {
      case ROUTER.HOME:
        return (
          <Ionicons
            size={ms(30)}
            color={isFocused ? colors.secondaryShade : colors.white}
            name="home-outline"
            maxFontSizeMultiplier={1}
          />
        );
      case ROUTER.ACCOUNT:
        return (
          <Ionicons
            size={ms(30)}
            color={isFocused ? colors.secondaryShade : colors.white}
            name="person-outline"
            maxFontSizeMultiplier={1}
          />
        );
      case ROUTER.CATEGORIES:
        return (
          <Ionicons
            size={ms(30)}
            color={isFocused ? colors.secondaryShade : colors.white}
            name="menu-outline"
            maxFontSizeMultiplier={1}
          />
        );
      case ROUTER.CART:
        return (
          <>
            <Ionicons
              size={ms(30)}
              color={isFocused ? colors.secondaryShade : colors.white}
              name="cart-outline"
              maxFontSizeMultiplier={1}
            />
            {cart?.cart?.items?.length && (
              <Badge
                status="error"
                value={cart?.cart?.items?.length}
                badgeStyle={{
                  backgroundColor: colors.secondaryShade,
                }}
                containerStyle={styles.badgeStyle}
              />
            )}
          </>
        );
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: tabBarOpacity,
          transform: [
            {
              translateY: tabBarAnim,
            },
          ],
        },
      ]}>
      <View style={[styles.innerContainer, commonStyles.shadow]}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const navigateToScreen = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!event.defaultPrevented) {
              if (isFocused) {
                navigation.navigate(route.name, {
                  screen: route.name,
                });
              } else {
                navigation.navigate(route.name);
              }
            }
          };

          const onPress = () => {
            if (route.name === ROUTER.CART) {
              return authCheckOnAction(() => {
                navigateToScreen();
              });
            } else {
              navigateToScreen();
            }
          };

          return (
            <AnimatedListItem
              index={index}
              key={route.key}
              styles={[styles.item]}>
              <Pressable
                android_ripple={{
                  radius: 30,
                  borderless: true,
                  color: colors.secondaryShade,
                }}
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.itemBtn}>
                {getIcon(route, isFocused)}
              </Pressable>
            </AnimatedListItem>
          );
        })}
        <Animated.View
          style={[
            styles.focused,
            {
              opacity: indicOpacity,
              transform: [
                {
                  translateX: indicAnim,
                },
              ],
            },
          ]}
        />
      </View>
    </Animated.View>
  );
};

export default TabBar;
