Tasks = new Mongo.Collection("tasks");

if (Meteor.isServer) {
    Tasks.allow({
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
       return (userId && doc.owner === userId);
    }
  });

  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish("tasks", function () {
    return Tasks.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });
}

if (Meteor.isClient) {
  // This code only runs on the client
Template.body.helpers({
    tasks: function () {
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        // Otherwise, return all of the tasks
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      return Tasks.find({checked: {$ne: true}}).count();
    }
  });

  Template.body.events({
    "change .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      var pleasure = event.target.value;
      var achievement = event.target.value
 console.log(pleasure)
 console.log(achievement)

      // Insert a task into the collection
      Tasks.insert({
        please: pleasure,
        achievement: achievement,
        createdAt: new Date(),            // current time
        owner: Meteor.userId(),           // _id of logged in user
        username: Meteor.user().username
      });
       console.log(pleasure)
 console.log(achievement)

    // Insert a task into the collection
      Meteor.call("addTask", pleasure, achievement);
      // Clear form
      event.target.value = "";
    },
  "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });


  Template.task.helpers({
    isOwner: function () {
      return this.owner === Meteor.userId();
    }
  });

    Template.task.events({
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
    passwordSignupFields: "USERNAME_ONLY"
  });

  }
  Meteor.methods({
  addTask: function (pleasure, achievement) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert({
      pleasure: pleasure,
      achievement: achievement,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
   deleteTask: function (taskId) {
    var task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }

    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
    var task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error("not-authorized");
    }
    Tasks.update(taskId, { $set: { private: setToPrivate } });
  }
});

