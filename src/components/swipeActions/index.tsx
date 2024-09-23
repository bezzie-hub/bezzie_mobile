import React from 'react';
import {View, ViewStyle} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Animated} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useCommonStyles from '@config/useCommonStyles';
import useStyles from './useStyles';
import useScale from '@utils/useScale';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PropType = {
  itemStyle: ViewStyle | ViewStyle[];
  leftIcon: {
    type: string;
    name: string;
  };
  rightIcon: {
    type: string;
    name: string;
  };
  leftIconType: 'danger' | 'success';
  rightIconType: 'danger' | 'success';
  leftAction: () => void;
  rightAction: () => void;
  children: React.ReactNode;
  containerStyle: ViewStyle;
};

const getIconComponent = (type: string) => {
  switch (type) {
    case 'material':
      return MaterialIcons;

    case 'ionicon':
      return Ionicons;

    default:
      return MaterialIcons;
  }
};

const Swipe: React.FC<PropType> = ({
  children,
  itemStyle,
  leftIcon,
  rightIcon,
  leftIconType,
  rightIconType,
  containerStyle,
  leftAction,
  rightAction,
}) => {
  const {colors} = useTheme();
  const {ms} = useScale();
  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const renderLeftActions = (progress: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 95],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const Icon = getIconComponent(leftIcon.type);

    return (
      <RectButton style={styles.actionContainer} onPress={leftAction}>
        <Animated.View
          style={[
            styles.leftAnimatedView,
            {
              opacity: trans,
              backgroundColor:
                leftIconType === 'danger'
                  ? colors.dangerBackground
                  : colors.successBackground,
            },
          ]}>
          <View style={styles.actionIconContainer}>
            <Icon
              color={leftIconType === 'danger' ? colors.danger : colors.success}
              name={leftIcon.name}
              size={ms(28)}
              style={styles.actionIcon}
              allowFontScaling={false}
            />
          </View>
        </Animated.View>
      </RectButton>
    );
  };

  const renderRightActions = (progress: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [-95, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const Icon = getIconComponent(rightIcon.type);

    return (
      <RectButton style={styles.actionContainer} onPress={rightAction}>
        <Animated.View
          style={[
            styles.rightAnimatedView,
            {
              opacity: trans,
              backgroundColor:
                rightIconType === 'danger'
                  ? colors.dangerBackground
                  : colors.successBackground,
            },
          ]}>
          <View style={styles.actionIconContainer}>
            <Icon
              color={
                rightIconType === 'danger' ? colors.danger : colors.success
              }
              name={rightIcon.name}
              size={ms(28)}
              style={styles.actionIcon}
              allowFontScaling={false}
            />
          </View>
        </Animated.View>
      </RectButton>
    );
  };

  return (
    <Swipeable
      overshootRight={false}
      overshootLeft={false}
      containerStyle={containerStyle}
      childrenContainerStyle={[commonStyles.shadow, itemStyle]}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
};

export default Swipe;
