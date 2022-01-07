module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      // '@babel/plugin-transform-modules-commonjs',
      {
        strictMode: false,
        allowTopLevelThis: true,
        loose: true,
        paths: [
          {
            rootPathSuffix: './src',
            rootPathPrefix: '@src',
          },
          {
            rootPathSuffix: './src/utils',
            rootPathPrefix: '!/',
          }, 
        ],
      },
    ],
    'react-native-reanimated/plugin'
  ],
};
