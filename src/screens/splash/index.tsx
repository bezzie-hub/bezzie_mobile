import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, ImageBackground, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomStatusBar from '@components/customStatusBar';
import useStyles from './useStyles';
import {useAppDispatch} from '../../store/hooks';
import {useTheme} from '@react-navigation/native';
import {ROUTER} from '../../navigations/routes';
import useGetTheme from '@src/utils/useGetTheme';
import {getSettings} from '@src/store/slices/settings';
import {getCategories} from '@src/store/slices/categories';

const Splash: React.FC<any> = props => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const {isDark} = useGetTheme();

  const getAppSettings = useCallback(async () => {
    try {
      await Promise.all([dispatch(getSettings()), dispatch(getCategories())]);
    } catch (error) {
    } finally {
      props.navigation.replace(ROUTER.HOME_NAV);
    }
  }, [dispatch, props.navigation]);

  useEffect(() => {
    getAppSettings();
  }, [getAppSettings]);

  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <ImageBackground
        source={{uri: 'splashimg'}}
        style={styles.imgBg}
        resizeMethod="scale"
        resizeMode="cover">
        <SafeAreaView style={styles.safeView}>
          <View>
            <View style={styles.loaderContainer}>
              <ActivityIndicator color={colors.secondary} size="large" />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default Splash;
