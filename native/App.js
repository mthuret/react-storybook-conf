import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './MyText';
import StorybookUI from './storybook';

class App extends React.Component {
  render() {
    return <Text />;
  }
}

module.exports = __DEV__ ? StorybookUI : App;
