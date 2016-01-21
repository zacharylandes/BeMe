
if (Meteor.isClient) {
  // This code is executed on the client only
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}
// if (Meteor.isServer) {
// Activities.allow({
//   insert: function(userId, a) {
//     // only allow posting if you are logged in
//     return !! userId;
//   }
// }

Meteor.startup(function() {
  ReactDOM.render(<App />,  document.getElementById('container'));
});
