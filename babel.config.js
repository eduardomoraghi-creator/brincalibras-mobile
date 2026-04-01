module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Certifique-se de que este plugin esteja **SEMPRE no final da lista**
      'react-native-reanimated/plugin',
    ],
  };
};