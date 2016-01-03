Activities = new Meteor.Collection("Activities");

Meteor.methods({
  insertActivity: function(activity) {
    activity = activity;
    check(activity.name, String);
    check(activity.pleasure, Number);
    check(activity.achievement, Number);
    check(activity.score, Number);

    return Activities.insert({activity: activity,
                             createdAt: new Date(),
                             owner: Meteor.userId(),
                             username: Meteor.user().username});

  }
})
