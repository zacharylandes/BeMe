
if (Meteor.isClient) {
  // This code is executed on the client only
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}
if(Meteor.is_server) {

  Activities.allow({
    insert: function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true;
    }
  });

}

Meteor.startup(function() {
  ReactDOM.render(<App />,  document.getElementById('container'));
});
