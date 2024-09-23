import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabBar from '@components/tabbar/index';
import Home from '@screens/home';
import Cart from '@screens/cart';
import Account from '@screens/account';
import Categories from '@screens/categories';
import {ROUTER} from '../routes';

export const navigationRef: any = React.createRef();

const Tab = createBottomTabNavigator();

function HomeNav(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
        tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name={ROUTER.HOME} component={Home} />
        <Tab.Screen name={ROUTER.ACCOUNT} component={Account} />
        <Tab.Screen name={ROUTER.CART} component={Cart} />
        <Tab.Screen name={ROUTER.CATEGORIES} component={Categories} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}

export default HomeNav;
