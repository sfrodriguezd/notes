import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';
// import { Session } from 'meteor/session';

export const Notes = new Mongo.Collection('notes');
// const searchedValue = Session.get('searchedValue');

if( Meteor.isServer) {
  Meteor.publish('notes', function () {
    // if (!searchedValue) {
    return Notes.find({ userId: this.userId });
    // } else {
    //   return Notes.find({ userId: this.userId, $text: {$search: searchedValue} });
    // }
  });
}

Meteor.methods({
  'notes.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('Not-authorized');
    }
    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf() //= new Date().getTime()
    });
  },
  'notes.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('Not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      }
    }).validate({
      _id: _id
    });

    Notes.remove({ _id, userId: this.userId });
  },
  'notes.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('Not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates,
    });

    Notes.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
});
