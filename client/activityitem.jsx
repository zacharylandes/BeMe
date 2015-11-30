ActivityItem = React.createClass({

  render: function() {
    // console.log('ActivityItem', this.props.activity.activity.name)
    var tail = this.props.activity.activity.name
    return (
     <li>{tail}</li>
    );
  }
})