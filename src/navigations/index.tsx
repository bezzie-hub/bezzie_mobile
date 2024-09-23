import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CommonActions,
  createNavigationContainerRef,
  DefaultTheme,
  ExtendedTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useNetInfo} from '@react-native-community/netinfo';

import {RootStackParamList, ROUTER} from './routes';
import Colors from '../config/colors';

import HomeNav from './home';
import Checkout from '../screens/checkout';
import useGetTheme from '../utils/useGetTheme';
import Products from '../screens/productList';
import PDP from '../screens/pdp';
import Orders from '../screens/orders';
import OrderDetails from '../screens/orderDetails';
import Addresses from '../screens/addresses';
import Settings from '../screens/settings';
import Auth from './auth';
import Splash from '@src/screens/splash';
import {useAppDispatch} from '@src/store/hooks';
import {setNetworkConnection} from '@src/store/slices/other';
import CreateEditAddress from '@src/screens/createEditAddress';
import ChangePassword from '@src/screens/changePassword';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: keyof RootStackParamList, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(name, params));
  }
}

export function onAuthSuccess() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: ROUTER.HOME_NAV,
          },
        ],
      }),
    );
  }
}

export function onLogout() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: ROUTER.HOME_NAV,
          },
        ],
      }),
    );
  }
}

const RootStack = createStackNavigator<RootStackParamList>();

function AppNavigation() {
  const {isDark} = useGetTheme();
  const {isConnected} = useNetInfo();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setNetworkConnection(isConnected || false));
  }, [dispatch, isConnected]);

  const AppTheme: ExtendedTheme = {
    ...DefaultTheme,
    colors: {
      primary: Colors.PRIMARY,
      secondaryShade: Colors.SECONDARY_SHADE,
      white: Colors.WHITE,
      background: isDark ? Colors.BACKGROUND_DARK : Colors.BACKGROUND_LIGHT,
      text: isDark ? Colors.TEXT_DARK : Colors.TEXT_LIGHT,
      border: isDark ? Colors.BORDER_DARK : Colors.BORDER_LIGHT,
      pageHead: isDark ? Colors.PAGE_HEAD_DARK : Colors.PAGE_HEAD_LIGHT,
      card: isDark ? Colors.CARD_DARK : Colors.CARD_LIGHT,
      shade: isDark ? Colors.TABBAR_SHADE_DARK : Colors.TABBAR_SHADE_LIGHT,
      contentText: isDark
        ? Colors.CONTENT_TEXT_DARK
        : Colors.CONTENT_TEXT_LIGHT,
      subText: isDark ? Colors.SUB_TEXT_DARK : Colors.SUB_TEXT_LIGHT,
      filterCard: isDark ? Colors.FILTER_CARD_DARK : Colors.FILTER_CARD_LIGHT,
      switch: isDark ? Colors.SECONDARY : Colors.PRIMARY,
      otherIcon: isDark ? Colors.SUCCESS_BACKGROUND : Colors.SECONDARY,
      notification: Colors.SECONDARY,
      secondary: Colors.SECONDARY,
      success: Colors.SUCCESS,
      danger: Colors.DANGER,
      successBackground: Colors.LIGHT_SECONDARY,
      dangerBackground: Colors.DANGER_BACKGROUND,
      lightPrimary: Colors.LIGHT_PRIMARY,
      grey: Colors.GREY,
      lightGrey: Colors.LIGHT_GREY,
      black: Colors.BLACK,
      headerBg: isDark ? Colors.HEADER_BG_DARK : Colors.HEADER_BG_LIGHT,
      cartBtn: isDark ? Colors.CART_BTN_DARK : Colors.CART_BTN_LIGHT,
      overlay: isDark ? Colors.OVERLAY_DARK : Colors.OVERLAY_LIGHT,
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={AppTheme} ref={navigationRef}>
        <Auth />
        <RootStack.Navigator
          initialRouteName={ROUTER.SPLASH as keyof RootStackParamList}
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
          }}>
          <RootStack.Screen
            name={ROUTER.SPLASH as keyof RootStackParamList}
            component={Splash}
          />
          <RootStack.Screen
            name={ROUTER.HOME_NAV as keyof RootStackParamList}
            component={HomeNav}
          />
          <RootStack.Screen
            name={ROUTER.CHECKOUT as keyof RootStackParamList}
            component={Checkout}
          />
          <RootStack.Screen
            name={ROUTER.PLP as keyof RootStackParamList}
            component={Products}
          />
          <RootStack.Screen
            name={ROUTER.PDP as keyof RootStackParamList}
            component={PDP}
          />
          <RootStack.Screen
            name={ROUTER.ORDERS as keyof RootStackParamList}
            component={Orders}
          />
          <RootStack.Screen
            name={ROUTER.ORDER_DETAILS as keyof RootStackParamList}
            component={OrderDetails}
          />
          <RootStack.Screen
            name={ROUTER.ADDRESSES as keyof RootStackParamList}
            component={Addresses}
          />
          <RootStack.Screen
            name={ROUTER.SETTINGS as keyof RootStackParamList}
            component={Settings}
          />
          <RootStack.Screen
            name={ROUTER.CHANGE_PASSWORD as keyof RootStackParamList}
            component={ChangePassword}
          />
          <RootStack.Screen
            name={ROUTER.CREATE_EDIT_ADDRESS as keyof RootStackParamList}
            component={CreateEditAddress}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppNavigation;
