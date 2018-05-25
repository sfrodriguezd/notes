import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../api/notes';
import { Session } from 'meteor/session';


export class NoteListSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedValue: ''
    }
  }

  handleLookingFor(e) {
    const searchedValue = e.target.value.toLowerCase();
    this.setState({ searchedValue });
    Session.set('searchedValue', searchedValue);
  }

  render() {
    return (
      <div className="item-list__search">
        <input
          className="item-list__input"
          value={this.state.searchedValue}
          placeholder="Look for a note?"
          onChange={this.handleLookingFor.bind(this)}
        />
      </div>
    );
  };
};
