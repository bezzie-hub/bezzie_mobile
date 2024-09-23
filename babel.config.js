module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@src': './src',
          '@store': './src/store',
          '@utils': './src/utils',
          '@services': './src/services',
          '@screens': './src/screens',
          '@components': './src/components',
          '@navigations': './src/navigations',
          '@assets': './src/assets',
          '@config': './src/config',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
