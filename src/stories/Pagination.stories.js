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

stories.add('First selected page', () => {
  return <Pagination
        nbPages={10}
        currentPage={1}
        onClick={() => {}}
        pagesPadding={3}
  />;
});

stories.addWithInfo('Last selected page', 'description', () => {
  const story = <Pagination
    nbPages={10}
    currentPage={10}
    onClick={action('refine')}
    pagesPadding={3}
  />;

  specs(() => describe('StarRating', () => {
    it('Clicking on a selected range should trigger the selection of the largest one', () => {
      const wrapper = mount(story);
      const onClick = expect.createSpy();
      wrapper.setProps({ onClick });

      const showFirst = wrapper.find('.ais-Pagination__itemFirst .ais-Pagination__itemLink');
      showFirst.simulate('click');

      expect(onClick).toHaveBeenCalled();
      expect(onClick).toHaveBeenCalledWith(1);
      wrapper.unmount();
    });
  }));

  return story;
});
