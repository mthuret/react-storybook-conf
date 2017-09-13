import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './MyText';
import StorybookUI from './storybook';
import MyText from './MyText';

module.exports = __DEV__ ? StorybookUI : MyText;
