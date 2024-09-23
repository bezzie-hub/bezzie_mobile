import React, {useRef, useEffect} from 'react';
import {Animated, Easing, ViewStyle} from 'react-native';

type PropTypes = {
  index: number;
  styles?: ViewStyle[];
  horizontal?: boolean;
  delayMultiple?: number;
  duration?: number;
  children: React.ReactNode;
};

const Item: React.FC<PropTypes> = ({
  children,
  index,
  styles,
  horizontal,
  delayMultiple,
  duration,
}) => {
  const value = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(value, {
        toValue: 1,
        duration: duration || 300,
        delay: index > 20 ? 0 : index * (delayMultiple || 150),
        useNativeDriver: true,
        easing: Easing.cubic,
      }),
      Animated.timing(position, {
        toValue: 0,
        duration: duration || 600,
        delay: index > 20 ? 0 : index * (delayMultiple || 150),
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]).start();
  }, [delayMultiple, duration, index, position, value]);

  return (
    <Animated.View
      style={[
        styles,
        {
          opacity: value,
          transform: [
            horizontal ? {translateX: position} : {translateY: position},
          ],
        },
      ]}>
      {children}
    </Animated.View>
  );
};

export default Item;
