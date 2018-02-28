import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NoteListHeader } from './NoteListHeader';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe ('NoteListHeader', function() {

    it('should call meteorCall on click', function() {
      const spy = expect.createSpy();
      const wrapper = mount(<NoteListHeader meteorCall={spy}/>);

      wrapper.find('button').simulate('click');

      // expect(spy.calls[0].arguments[0]).toBe('notes.insert');
      expect(spy).toHaveBeenCalledWith('notes.insert');
    });

  });
}
