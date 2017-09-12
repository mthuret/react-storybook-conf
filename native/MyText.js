import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StorybookUI from './storybook';

export default class MyText extends React.Component {
  render() {
    return (
      <View>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}
