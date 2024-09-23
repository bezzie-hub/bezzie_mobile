import React, {useEffect} from 'react';
import {useRef} from 'react';
import {Animated, StyleSheet, ViewStyle} from 'react-native';

const FadeInView = ({
  children,
  itemStyles = null,
}: {
  children: React.ReactElement;
  itemStyles?: ViewStyle | null;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={{
        ...(itemStyles ? itemStyles : styles.flex1),
        opacity: fadeAnim,
      }}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

export default FadeInView;
