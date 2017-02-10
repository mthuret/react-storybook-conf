import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import StarRating from '../StarRating';
import {withKnobs, boolean, number, array} from '@kadira/storybook-addon-knobs';
import {orderBy} from 'lodash';
import '../StarRating.css';
import { specs, describe, it } from 'storybook-addon-specifications'
import {mount} from "enzyme";
import expect from "expect";

const stories = storiesOf('StarRating', module);

stories.addDecorator(withKnobs);

stories.add('Default', () => {
  const story = <StarRating
        createURL={() => '#'}
        refine={linkTo('StarRating', (filter) => {
          console.log(filter);
          return 'another Range';
        })}
        min={number('min', 1)}
        max={number('max', 5)}
        currentRefinement={{min: 1, max: 5}}
        count={[{value: '1', count: 1},
          {value: '2', count: 2},
          {value: '3', count: 3},
          {value: '4', count: 4},
          {value: '5', count: 5}]}
        canRefine={true}
  />;

  specs(() => describe('StarRating', () => {
    it('Clicking on a selected range should trigger the selection of the largest one', () => {
      const wrapper = mount(story);
      const refine = expect.createSpy();
      wrapper.setProps({currentRefinement: {min: 5, max: 5}});
      wrapper.setProps({refine});

      const links = wrapper.find('.ais-StarRating__ratingLink');
      links.first().simulate('click');

      expect(refine).toHaveBeenCalled();
      expect(refine).toHaveBeenCalledWith({min: 1, max: 5});
      wrapper.unmount();
    });
  }));

  return story;
});

stories.addWithInfo(
    'Highest selected range',
    `
      Some description
    `,
    () =>
      <StarRating
        createURL={() => '#'}
        refine={action('refine')}
        min={1}
        max={5}
        currentRefinement={{min: 5, max: 5}}
        count={[{value: '1', count: 1},
          {value: '2', count: 2},
          {value: '3', count: 3},
          {value: '4', count: 4},
          {value: '5', count: 5}]}
        canRefine={true}
      />
    ,
);
