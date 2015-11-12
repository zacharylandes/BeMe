Beers = new Meteor.Collection("Beers");

Meteor.methods({
  "insertBeer": function(pleasure,achievement, add,cat) {
    pleasure = parseInt(pleasure);
    achievement = parseInt(achievement);
    cat = ['social','work', 'recreation', 'wellbeing', 'daily'];
    add = {cat: parseInt(pleasure + achievement)};
    check(pleasure, Number);
    check(achievement, Number);
    check(add, Object);
    check(cat, Array);

    return Beers.insert({pleasure: pleasure, achievement:achievement, cat:cat, add: {cat: cat, pleasure: pleasure, achievement:achievement}});
  },

  "removeBeer": function(id) {
    check(id, String);
    return pleasure.remove(id); achievement.remove(id); add.remove(id), cat.remove(id)
  }
})
