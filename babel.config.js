module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './app',
            rootPathPrefix: '@app',
          },
          {
            rootPathSuffix: './app/utils',
            rootPathPrefix: '!/',
          },
        ],
      },
    ],
  ],
};
