import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import Pagination from '../Pagination';
import {withKnobs, boolean, number, array} from '@kadira/storybook-addon-knobs';

const stories = storiesOf('Pagination', module);

stories.addDecorator(withKnobs);

stories.add('First selected page', () => {
  return <Pagination
        nbPages={10}
        currentPage={1}
        onClick={() => {}}
        pagesPadding={3}
  />;
});