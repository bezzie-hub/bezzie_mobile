export const openTransitionSpec = {
  animation: 'timing' as 'timing',
  config: {
    toValue: 1,
    easing: (value: number) => value,
    duration: 500,
    delay: 0,
    useNativeDriver: true,
  },
};

export const closeTransitionSpec = {
  animation: 'timing' as 'timing',
  config: {
    toValue: 0,
    easing: (value: number) => value,
    duration: 500,
    delay: 0,
    useNativeDriver: true,
  },
};
