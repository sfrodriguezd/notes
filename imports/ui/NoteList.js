import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import { NoteListSearchBar } from './NoteListSearchBar';

export class NoteList extends React.Component {
  renderList() {
    if (!this.props.searchedValue) {
      return this.props.notes.map((note) => {
        return <NoteListItem key={note._id} note={note}/>
      })
    } else {
      return this.props.notes.filter((note) => {
        title = note.title.toLowerCase();
        return title.indexOf(this.props.searchedValue) > -1;
      }).map((note) => {
        return <NoteListItem key={note._id} note={note}/>
      });
    }
  }
  render (props) {
    return (
      <div className="item-list">
        <NoteListHeader/>
        <NoteListSearchBar />
        <p className="items__number">You have { this.props.notes.length } notes.</p>
        { this.props.notes.length === 0 ? <NoteListEmptyItem/> : undefined }
        {this.renderList()}
      </div>
    );
  }
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer (() => {
  const selectedNoteId = Session.get('selectedNoteId');

  Meteor.subscribe('notes');

  return {
    searchedValue: Session.get('searchedValue'),
    notes: Notes.find({}, { sort: { updatedAt: -1 } }).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      };
    })
  }
}, NoteList);
