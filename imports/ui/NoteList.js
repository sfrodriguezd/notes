import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {
    // if(props.notes.length === 0) {
    //   return <NoteListEmptyItem/>
    // }

  return (
    <div className="item-list">
      <NoteListHeader/>
      <p className="empty-item">You have { props.notes.length } notes.</p>
      {/* <NoteListEmptyItem/> */}
      { props.notes.length === 0 ? <NoteListEmptyItem/> : undefined }
      { props.notes.map((note) => {
          return <NoteListItem key={note._id} note={note}/>
        })
      }
    </div>
  );


};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer (() => {
  const selectedNoteId = Session.get('selectedNoteId');

  Meteor.subscribe('notes');

  return {
    notes: Notes.find({}, { sort: { updatedAt: -1 } }).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      };
    })
  }

}, NoteList);
