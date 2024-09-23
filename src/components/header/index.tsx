import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useScale from '@utils/useScale';
import {RootStackParamList} from '@navigations/routes';

import useStyles from './useStyles';

const Header: React.FC<{
  title: string;
}> = ({title}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const {ms} = useScale();
  const {goBack} = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={goBack}>
        <Ionicons name="arrow-back" color={colors.pageHead} size={ms(20)} />
      </Pressable>
      <Text style={styles.headText} allowFontScaling={false}>
        {title}
      </Text>
    </View>
  );
};

export default Header;
