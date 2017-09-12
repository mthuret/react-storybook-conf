import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Text from '../../MyText';

storiesOf('Button', module).add('with text', () => (
  <View>
    <View>
      <Text />
    </View>
  </View>
));
