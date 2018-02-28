import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NoteListItem from './NoteListItem';

configure({ adapter: new Adapter() });

if ( Meteor.isClient ) {
  describe('NoteListItem', function() {

    it('should render title and time stamp', function () {
      const title = 'My title here';
      const updatedAt = 1519818924023;
      const wrapper = mount( <NoteListItem note={{ title, updatedAt }}/>)

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('28/02/18');
    });

    it('should set default title if no title set', function() {
      const title = '';
      const updatedAt = 1519818924023;
      const wrapper = mount( <NoteListItem note={{ title, updatedAt }}/>)

      expect(wrapper.find('h5').text()).toBe('Untitled note');
      expect(wrapper.find('p').text()).toBe('28/02/18');
    });

  });
}
