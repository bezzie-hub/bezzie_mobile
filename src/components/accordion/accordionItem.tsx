import React from 'react';
import {View} from 'react-native';
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useStyles from './useStyles';

const AccordionItem: React.FC<{
  isExpanded: any;
  children: React.ReactElement;
  viewKey: string;
  duration?: number;
}> = ({isExpanded, children, viewKey, duration = 500}) => {
  const height = useSharedValue(0);
  const styles = useStyles();

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    }),
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <View>
      <Animated.View
        key={`accordionItem_${viewKey}`}
        style={[styles.animatedContent, bodyStyle]}>
        <View
          onLayout={e => {
            height.value = e.nativeEvent.layout.height;
          }}
          style={styles.content}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default AccordionItem;
