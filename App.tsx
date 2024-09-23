import React, {useCallback, useEffect} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import UserNav from '@navigations/index';
import {store} from '@store/index';
import {checkAuthorization} from '@src/store/slices/user';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222' : '#F3F3F3',
    flex: 1,
  };

  const checkAuth = useCallback(async () => {
    try {
      await store.dispatch(checkAuthorization());
    } catch (error) {
    } finally {
      SplashScreen.hide();
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={backgroundStyle}>
          <UserNav />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
export default App;
