import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import Pagination from '../Pagination';
import {withKnobs, boolean, number, array} from '@kadira/storybook-addon-knobs';
import {orderBy} from 'lodash';
import { specs, describe, it } from 'storybook-addon-specifications'
import {mount} from "enzyme";
import expect from "expect";

const stories = storiesOf('Pagination', module);

stories.addDecorator(withKnobs);

stories.add('First page selected', () => {
  return <Pagination
        nbPages={10}
        currentPage={1}
        onClick={() => {}}
        pagesPadding={3}
  />;
});

stories.addWithInfo('Last page selected', 'description', () => {
  const story = <Pagination
    nbPages={10}
    currentPage={10}
    onClick={action('refine')}
    pagesPadding={3}
  />;

  return story;
});
