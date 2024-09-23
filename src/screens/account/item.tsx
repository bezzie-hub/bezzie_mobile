import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Pressable, View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useStyles from './useStyles';
import AnimatedListItem from '@components/animatedListItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useScale from '@utils/useScale';

const Item: React.FC<{
  name: string;
  icon: string;
  onPress: () => void;
  index: number;
  alternativeIcon?: React.ReactNode;
}> = ({name, icon, onPress, index, alternativeIcon}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const {ms} = useScale();
  return (
    <AnimatedListItem
      index={index}
      styles={[
        styles.animItem,
        index % 2 === 0 ? styles.animLeft : styles.animRight,
      ]}>
      <Pressable style={[styles.item]} onPress={onPress}>
        <View style={styles.left}>
          {alternativeIcon ? (
            alternativeIcon
          ) : (
            <Ionicons
              color={colors.text}
              name={icon}
              size={ms(20)}
              style={styles.leftIcon}
              allowFontScaling={false}
            />
          )}
          <Text allowFontScaling={false} style={[styles.itemText]}>
            {name}
          </Text>
        </View>
        <MaterialIcons
          color={colors.text}
          name={'chevron-right'}
          size={ms(24)}
          style={styles.rightIcon}
          allowFontScaling={false}
        />
      </Pressable>
    </AnimatedListItem>
  );
};

export default Item;
