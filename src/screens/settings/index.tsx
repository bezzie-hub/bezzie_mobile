import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import Form from './form';
import useCommonStyles from '@config/useCommonStyles';
import OptimizedScene from '@components/optimizedScene';
import Header from '@components/header';
import CustomStatusBar from '@components/customStatusBar';
import useGetTheme from '@utils/useGetTheme';

const Settings = () => {
  const {colors} = useTheme();
  const commonStyles = useCommonStyles();
  const {isDark} = useGetTheme();
  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <OptimizedScene>
        <View
          style={[
            commonStyles.container,
            {backgroundColor: colors.background},
          ]}>
          <Header title="Settings" />
          <Form />
        </View>
      </OptimizedScene>
    </>
  );
};

export default Settings;
