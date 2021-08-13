module.exports = {
  root: true,
  extends: '@react-native-community',
  globals: {
    Logger: true,
    scaleWidth: true,
    scaleHeight: true,
    scaleFont: true,
    screenNames: true,
    translate: true,
  },
  plugins: [
    // ...
    'react-hooks',
  ],
  rules: {
    // ...
    'react-hooks/rules-of-hooks': 'error', // Kiểm tra rule của Hook
    'react-hooks/exhaustive-deps': 'warn', // Kiểm tra effect dependency
  },
};
