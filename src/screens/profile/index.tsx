import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomStatusBar from '@components/customStatusBar';

import OptimizedScene from '@components/optimizedScene';
import useCommonStyles from '@config/useCommonStyles';
import {useAppSelector} from '@store/hooks';
import useStyles from './useStyles';

const Profile: React.FC<any> = props => {
  const {colors} = useTheme();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const {theme} = useAppSelector(state => state.other);

  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <OptimizedScene>
        <View style={[styles.container]}>
          <Text style={[commonStyles.headText]} allowFontScaling={false}>
            Profile
          </Text>
          <View style={[styles.innerContainer]}></View>
        </View>
      </OptimizedScene>
    </>
  );
};

export default Profile;
