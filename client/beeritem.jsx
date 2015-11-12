ActivityItem = React.createClass({
    handleClick() {
      var id = this.props.activity._id;
      Meteor.call("removeActivity", id, function(e) {
        if (e) alert(e.reason);
      });
    },

  render: function() {
    var tail = this.props.activity.activites > 1 ? "activites" : "activity";

    return (
      <li onClick={this.handleClick}>On grabbed <strong>{this.props.activity.activites}</strong> {tail}</li>
    );
  }
})
