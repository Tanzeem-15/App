module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-redux|redux-persist|react-native-linear-gradient|@react-native-async-storage)/)',
  ],
  setupFiles: ['./jest.setup.js'],
};
