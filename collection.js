Activities = new Meteor.Collection("Activities");

Meteor.methods({
  "insertActivity": function(pleasure,achievement, add,cat) {
    pleasure = parseInt(pleasure);
    achievement = parseInt(achievement);
    cat = ['social','work', 'recreation', 'wellbeing', 'daily'];
    add = {cat: cat, add: parseInt(pleasure)+parseInt(achievement)};
    check(pleasure, Number);
    check(achievement, Number);
    check(add, Object);
    check(cat, Array);
    return Activities.insert({pleasure: pleasure, achievement:achievement, cat:cat, add: {cat:cat, add: parseInt(pleasure)+parseInt(achievement)}});
  },

  "removeActivity": function(id) {
    check(id, String);
    return pleasure.remove(id); achievement.remove(id); add.remove(id), cat.remove(id)
  }
})
