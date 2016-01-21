
if (Meteor.isClient) {
  // This code is executed on the client only
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}
// if (Meteor.isServer) {
//   // Only publish tasks that are public or belong to the current user
//   Meteor.publish("activities", function () {
//     return Activities.find({
//       $or: [
//         { private: {$ne: true} },
//         { owner: this.userId }
//       ]
//     });
//   });
// }

Meteor.startup(function() {
  ReactDOM.render(<App />,  document.getElementById('container'));
});
