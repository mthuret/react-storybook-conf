import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import Pagination from '../Pagination';
import { withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import { orderBy } from 'lodash';
import { withInfo } from '@storybook/addon-info';

const stories = storiesOf('Widgets/Pagination', module);

stories.addDecorator(withKnobs);

stories.add('First page selected', () => {
  return (
    <Pagination
      nbPages={10}
      currentPage={1}
      onClick={() => {}}
      pagesPadding={3}
    />
  );
});
