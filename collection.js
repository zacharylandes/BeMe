Activities = new Meteor.Collection("Activities");

Meteor.methods({
  insertActivity: function(activity) {
    activity = activity;
    check(activity.name, String);
    check(activity.pleasure, Number);
    check(activity.achievement, Number);
    check(activity.score, Number);

    return Activities.insert({activity});

  },

  removeActivity: function(id) {
    check(id, String);
    return pleasure.remove(id); achievement.remove(id); add.remove(id), cat.remove(id), name.remove(id)
  }
})
