Activities = new Mongo.Collection("Activities");
if (Meteor.isServer) {
    Activities.allow({
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
       return (userId && doc.owner === userId);
    }
  });
  // This code only runs on the server
  Meteor.publish("activities", function () {
    return Activities.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });
}


if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("activities");

  Template.body.helpers({
    activities: function () {
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Activities.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        // Otherwise, return all of the tasks
        return Activities.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      return Activities.find({checked: {$ne: true}}).count();
    }
  });

  Template.body.events({
    "change .new-range, submit .new-activity": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      var name = event.target.name.value;
      var pleasure = event.target.value;
      var achievement = event.target.value;

      // Insert a activity into the collection
      Activities.insert({
        name: name,
        pleasure: pleasure,
        achievement: achievement,
        createdAt: new Date(), // current time
        owner: Meteor.userId(),           // _id of logged in user
        username: Meteor.user().username
      });
      console.log(pleasure)
      console.log(achievement);
      console.log(name);

      // Clear form
    Meteor.call("addActivity", pleasure, achievement);
      // Clear form
      event.target.value = "";
    },
  "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });


  Template.activity.helpers({
    isOwner: function () {
      return this.owner === Meteor.userId();
    }
  });

    Template.activity.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Meteor.call("setChecked", this._id, ! this.checked);
    },
   "click .delete": function () {
      Meteor.call("deleteTask", this._id);
    },
    "click .toggle-private": function () {
      Meteor.call("setPrivate", this._id, ! this.private);
    }
  });

  Accounts.ui.config({
      passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL' });
}
  Meteor.methods({
  addActivity: function (name, pleasure, achievement) {
    // Make sure the user is logged in before inserting a activity
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Activities.insert({
      pleasure: pleasure,
      achievement: achievement,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
   deleteActivity: function (activityId) {
    var activity = Activities.findOne(activityId);
    if (activity.private && activity.owner !== Meteor.userId()) {
      // If the activity is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }

    Activities.remove(activityId);
  },
  setChecked: function (activityId, setChecked) {
    var activity = Activities.findOne(activityId);
    if (activity.private && activity.owner !== Meteor.userId()) {
      // If the activity is private, make sure only the owner can check it off
      throw new Meteor.Error("not-authorized");
    }
    Activities.update(activityId, { $set: { private: setToPrivate } });
  }
});
