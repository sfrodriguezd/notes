import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const NoteListEmptyItem = () => {
  return (
    <div>
      <h5>You have no notes.</h5>
      <p>Create a note to get started.</p>
    </div>
  )
};

export default NoteListEmptyItem;
