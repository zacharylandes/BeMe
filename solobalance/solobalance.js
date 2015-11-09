Person = new Mongo.Collection("persons");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
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
      Persons.insert({
        please: pleasure,
        achievement: achievement,
        createdAt: new Date(),            // current time
        owner: Meteor.userId(),           // _id of logged in user
        username: Meteor.user().username
      });
       console.log(pleasure)
 console.log(achievement)

    // Insert a task into the collection
      Meteor.call("addPerson", pleasure, achievement);
      // Clear form
      event.target.value = "";
    },

    // code to run on server at startup
  });
}}
 Meteor.methods({
  addPerson: function (pleasure, achievement) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Persons.insert({
      pleasure: pleasure,
      achievement: achievement,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  }}),



